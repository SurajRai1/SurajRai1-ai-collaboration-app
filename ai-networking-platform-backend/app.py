from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Configure SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///profiles.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Profile model
class Profile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    interests = db.Column(db.String(200), nullable=False)
    goals = db.Column(db.String(200), nullable=False)
    skills = db.Column(db.String(200), nullable=False)

    def __repr__(self):
        return f'<Profile {self.name}>'

# Root route
@app.route('/')
def home():
    return "Backend is running."

# Route to handle profile submission
@app.route('/api/submit-profile', methods=['POST'])
def submit_profile():
    data = request.json
    name = data.get('name')
    interests = data.get('interests')
    goals = data.get('goals')
    skills = data.get('skills')

    # Save profile to the database
    new_profile = Profile(name=name, interests=interests, goals=goals, skills=skills)
    db.session.add(new_profile)
    db.session.commit()

    return jsonify({
        'message': 'Profile submitted successfully!',
        'data': {
            'name': name,
            'interests': interests,
            'goals': goals,
            'skills': skills
        }
    }), 200

# Route to match profiles based on shared interests, goals, or skills
@app.route('/api/match-profiles', methods=['POST'])
def match_profiles():
    data = request.json
    target_interests = data.get('interests')
    target_goals = data.get('goals')
    target_skills = data.get('skills')

    matched_profiles = Profile.query.filter(
        (Profile.interests.like(f'%{target_interests}%')) |
        (Profile.goals.like(f'%{target_goals}%')) |
        (Profile.skills.like(f'%{target_skills}%'))
    ).all()

    matched_data = [
        {
            'id': profile.id,
            'name': profile.name,
            'interests': profile.interests,
            'goals': profile.goals,
            'skills': profile.skills
        } for profile in matched_profiles
    ]

    return jsonify(matched_data), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure tables are created before the first request
    app.run(debug=True, port=5000)
