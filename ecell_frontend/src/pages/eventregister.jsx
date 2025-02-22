import React, { useState } from 'react';
import { 
  Container,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Typography,
  FormControlLabel,
  Radio,
  RadioGroup,
  Box,
  Link,
  InputAdornment,
  IconButton
} from '@mui/material';
import { motion } from 'framer-motion';
import { FaPaperclip, FaUser, FaEnvelope, FaPhone, FaUsers } from 'react-icons/fa';
import config from '../config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Arrays for dropdown data
const departments = ['CSE', 'ECE', 'ME', 'CE', 'EE', 'Other'];
const years = ['1st', '2nd', '3rd', '4th'];
const teamSizes = ['1', '2', '3', '4'];
const roles = ['Developer', 'Designer', 'Manager', 'Other'];
const techStacks = ['React', 'Python', 'Java', 'JavaScript', 'Node.js', 'C++', 'C#', 'Go', 'Rust', 'Other'];
const participationOptions = ['Yes', 'No'];

const EventRegister = () => {
  const [formData, setFormData] = useState({
    participationType: 'individual',
    fullName: '',
    Email: '',
    phoneNumber: '',
    department: '',
    yearOfStudy: '',
    studentrollno: '',
    teamName: '',
    teamSize: '1',
    teamRole: '',
    eventExperience: '',
    techStack: '',
    githubLink: '',
    previousProjects: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleTeamMemberChange = (index, value) => {
    const newMembers = [...formData.teamMembers];
    newMembers[index] = value;
    setFormData({
      ...formData,
      teamMembers: newMembers
    });
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      teamMembers: [...formData.teamMembers, '']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form Data:', formData);
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20"
      >
        <div className="text-center">
          <Typography variant="h4" className="mt-6 text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Event Registration
          </Typography>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Participation Type */}
          <FormControl component="fieldset" margin="normal">
            <Typography variant="h6" gutterBottom>Participation Type</Typography>
            <RadioGroup
              name="participationType"
              value={formData.participationType}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="individual" control={<Radio />} label="Individual" />
              <FormControlLabel value="team" control={<Radio />} label="Team" />
            </RadioGroup>
          </FormControl>

          {/* Basic Information */}
          <Typography variant="h6" gutterBottom>Basic Information</Typography>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="University Email ID"
            name="universityEmail"
            type="email"
            value={formData.universityEmail}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phoneNumber"
            type="tel"
            value={formData.phoneNumber}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Academic Details */}
          <Typography variant="h6" gutterBottom>Academic Details</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              label="Department"
              required
            >
              {departments.map((dept) => (
                <MenuItem key={dept} value={dept}>{dept}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Year of Study</InputLabel>
            <Select
              name="yearOfStudy"
              value={formData.yearOfStudy}
              onChange={handleChange}
              label="Year of Study"
              required
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year} Year</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Student ID/Roll Number"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            margin="normal"
            required
          />

          {/* Team Details - Only shown if participation type is team */}
          {formData.participationType === 'team' && (
            <>
              <Typography variant="h6" gutterBottom>Team Details</Typography>
              <TextField
                fullWidth
                label="Team Name"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                margin="normal"
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Team Size</InputLabel>
                <Select
                  name="teamSize"
                  value={formData.teamSize}
                  onChange={handleChange}
                  label="Team Size"
                  required
                >
                  {teamSizes.map((size) => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Role in Team</InputLabel>
                <Select
                  name="teamRole"
                  value={formData.teamRole}
                  onChange={handleChange}
                  label="Role in Team"
                  required
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          )}

          {/* Event Experience */}
          <Typography variant="h6" gutterBottom>Event Experience</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Previous Event Experience</InputLabel>
            <Select
              name="eventExperience"
              value={formData.eventExperience}
              onChange={handleChange}
              label="Previous Event Experience"
              required
            >
              {participationOptions.map((option) => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Technical Skills & Experience */}
          <Typography variant="h6" gutterBottom>Technical Skills & Experience (Optional)</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Primary Tech Stack</InputLabel>
            <Select
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              label="Primary Tech Stack"
            >
              {techStacks.map((tech) => (
                <MenuItem key={tech} value={tech}>{tech}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="GitHub/Portfolio Link"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Previous Projects"
            name="previousProjects"
            value={formData.previousProjects}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={3}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </motion.div>
    </Box>
  );
};

export default EventRegister;
