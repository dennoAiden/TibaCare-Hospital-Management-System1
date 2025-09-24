from flask import Flask, request, session, make_response,jsonify, send_from_directory, render_template
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_restful import Api, Resource
from flask_cors import CORS
import datetime

from models import db, Doctor, Department, Patient, Appointment
from werkzeug.utils import secure_filename
import os

from dotenv import load_dotenv
load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
    )

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'images')
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SESSION_COOKIE_SECURE'] = True
app.json.compact = False

migrate = Migrate(app, db)
api = Api(app)
bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)

db.init_app(app)


@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

class Images(Resource):
    def get(self):
        # Get the model type and filename from query parameters
        model_type = request.args.get('model').lower()  # Convert to lowercase
        filename = request.args.get('filename')

        if not filename:
            return {"message": "Filename is required"}, 400

        # Determine the model and fetch the image
        if model_type == 'doctor':
            doctor = Doctor.query.filter_by(image=filename).first()  # Adjust based on your field
            if doctor:
                return send_from_directory(UPLOAD_FOLDER, filename)
            else:
                return {"message": "Doctor image not found"}, 404

        elif model_type == 'department':
            department = Department.query.filter_by(image=filename).first()  # Adjust based on your field
            if department:
                return send_from_directory(UPLOAD_FOLDER, filename)
            else:
                return {"message": "Department image not found"}, 404

        return {"message": "Invalid model type"}, 400

    
class DoctorsByDepartment(Resource):
    def get(self, id):
        department = Department.query.filter_by(id=id).first()
        if not department:
            return {"error": "Department not found"}, 404
        doctors_dict = [doctor.to_dict() for doctor in department.doctors]
        return make_response(doctors_dict, 200)


class DoctorProfile(Resource):
    def get(self, id):
        doctor = Doctor.query.filter_by(id=id).first()
        return make_response(doctor.to_dict(), 200)

class DoctorSignup(Resource):
    def post(self):
        data = request.form
        image = request.files.get('image')
        
        if image:
            filename = secure_filename(image.filename)
            image_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            image.save(image_path)
        else:
            image_path = None
            
        new_doctor = Doctor(
            title=data.get('title'),
            doctorId=data.get('doctorId'),
            first_name=data.get('firstName'),
            last_name=data.get('lastName'),
            email=data.get('email'),
            bio=data.get('bio'),
            education=data.get('education'),
            certifications=data.get('certifications'),
            specialty=data.get('specialty'),
            image=image_path,
            department_id=data.get('department'),
            password=bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        )

        try:
            db.session.add(new_doctor)
            db.session.commit()
            return new_doctor.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class DoctorLogin(Resource):
    def post(self):
        data = request.get_json() 
        doctor = Doctor.query.filter_by(email=data['email']).first()

        if doctor and bcrypt.check_password_hash(doctor.password, data['password']):
            session['user_id'] = doctor.id
            session['user_role'] = 'doctor'
            return {
                "message": "Login successful",
                "data": doctor.to_dict(),
                "status": 200
            }
        else:
            return {"error": "Invalid credentials"}, 401
        
class PatientSignup(Resource):
    def post(self):
        data = request.get_json()

        new_patient = Patient(
            first_name=data.get('first_name'),
            last_name=data.get('last_name'),
            email=data.get('email'),
            age=int(data.get('age')),
            phone_number=data.get('phone_number'),
            gender=data.get('gender'),
            password=bcrypt.generate_password_hash(data.get('password')).decode('utf-8')
        )

        try:
            db.session.add(new_patient)
            db.session.commit()
            return new_patient.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"error": str(e)}, 500

class PatientLogin(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        patient = Patient.query.filter_by(email=email).first()

        if patient and bcrypt.check_password_hash(patient.password, password):
            # Set session
            session["user_id"] = patient.id
            session["user_role"] = "patient"

            return {
                "message": "Login successful",
                "user": patient.to_dict(),
                "role": "patient"
            }, 200

        return {"error": "Invalid email or password"}, 401

class Logout(Resource):
    def delete(self):
        session.pop('user_id', None)
        return {}, 204

# Check Session Resource
class CheckSession(Resource):
    def get(self):
        user_id = session.get('user_id')
        user_role = session.get('user_role')

        if user_id and user_role:
            if user_role == 'doctor':
                user = Doctor.query.get(user_id)
            elif user_role == 'patient':
                user = Patient.query.get(user_id) 
            if user:
                return {
                    "user": user.to_dict(),
                    "role": user_role 
                }, 200
            else:
                return {"error": "User not found"}, 404
        return {"error": "Unauthorized"}, 401
    
class DoctorById(Resource):
    def get(self, id):
        doctor = Doctor.query.filter_by(id=id).first()
        return make_response(doctor.to_dict(),200)

class DepartmentList(Resource):
    def get(self):
        departments_dict =[department.to_dict() for department in Department.query.all()]
        return make_response(departments_dict, 200)
    
class PatientById(Resource):
    def get(self, id):
        patient = Patient.query.filter_by(id=id).first()
        return make_response(patient.to_dict(),200)
        
class AppointmentBooking(Resource):
    def post(self):
        data = request.get_json()

        doctor_id = data.get('doctor_id')
        patient_id = data.get('patient_id')  
        date = data.get('date')
        time = data.get('time')
        medical_records = data.get('medical_records', "None")

        if not doctor_id or not patient_id or not date or not time:
            return {"error": "Missing required information (doctor, patient, date, or time)"}, 400

        try:
            appointment_date = datetime.datetime.strptime(date, '%Y-%m-%d').date()
            appointment_time = datetime.datetime.strptime(time, '%H:%M').time()
        except ValueError:
            return {"error": "Invalid date or time format"}, 400

        try:
            new_appointment = Appointment(
                doctor_id=doctor_id,
                patient_id=patient_id,
                date=appointment_date,
                time=appointment_time,
                medical_records=medical_records
            )
            db.session.add(new_appointment)
            db.session.commit()

            return {
                "message": "Appointment booked successfully",
                "data": new_appointment.to_dict(),
                "status": 201
            }, 201
        except Exception as e:
            db.session.rollback()
            return {"error": f"Failed to book appointment: {str(e)}"}, 500
    
class Patients(Resource):
    def get(self, id):
        doctor = Doctor.query.get(id)
        if not doctor:
            return jsonify({"error": "Doctor not found"}), 404
        
        patients = [patient.to_dict() for patient in doctor.patient]

        return (
            patients,
        ), 200

class PatientsByDoctor(Resource):
    def get(self, doctor_id):
        doctor = Doctor.query.get_or_404(doctor_id)
        return [p.to_dict() for p in doctor.patients], 200



# Register API Resources
api.add_resource(PatientsByDoctor,'/api/patients/doctor/<int:doctor_id>')
api.add_resource(DoctorSignup, '/api/doctorsignup', endpoint='doctorsignup')
api.add_resource(DoctorLogin, '/api/doctorlogin', endpoint='doctorlogin')
api.add_resource(Logout, '/api/logout', endpoint=None)
api.add_resource(CheckSession, '/api/check_session', endpoint='check_session')
api.add_resource(PatientSignup, '/api/patientsignup', endpoint='patientsignup')
api.add_resource(PatientLogin, '/api/patientlogin', endpoint='patientlogin')
api.add_resource(DoctorById, '/api/doctor/<int:id>')
api.add_resource(PatientById, '/api/patient/<int:id>')
api.add_resource(AppointmentBooking, '/api/appointments/book')
api.add_resource(DepartmentList, '/api/departments', endpoint='departments')
api.add_resource(DoctorsByDepartment, '/api/departments/<int:id>')
api.add_resource(DoctorProfile, '/api/doctors/<int:id>')
api.add_resource(Images, '/api/images')
