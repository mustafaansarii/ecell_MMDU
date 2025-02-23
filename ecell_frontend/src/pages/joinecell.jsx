import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import config from '../config';
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Box,
  Grid,
  Paper,
  Autocomplete,
  createFilterOptions,
  CircularProgress
} from '@mui/material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import GroupsIcon from '@mui/icons-material/Groups';

const pageDescription = `Join our vibrant E-Cell community! We're looking for passionate individuals who want to make a difference in the entrepreneurial ecosystem. Whether you're a tech enthusiast, marketing guru, or have innovative startup ideas, we have a place for you.`;

const customTheme = createTheme({
  palette: {
    mode: 'light', // Will be overridden by system preference
    background: {
      paper: '#ffffff',
      default: '#f8fafc'
    }
  }
});

export default function JoinEcell() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    roll_number: '',
    course_branch: '',
    year_of_study: '',
    contact_number: '',
    email: '',
    field_of_interest: '',
    role_preference: '',
    motivation: '',
    value_proposition: '',
    time_commitment: '',
    linkedin_profile: '',
    experience_description: '',
    skills: '',
    portfolio_links: '',
    startup_ideas_description: '',
    suggestions: '',
    team_work_comfort: false,
    has_experience: false,
    has_startup_ideas: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Check if form was already submitted
  useEffect(() => {
    const isSubmitted = localStorage.getItem('ecellFormSubmitted');
    if (isSubmitted === 'true') {
      setFormSubmitted(true);
      toast('You have already submitted the form.', { icon: 'ℹ️' });
      navigate('/');
    }
  }, [navigate]);

  const formOptions = {
    courseBranches: [
        'B.Tech (CSE)',
        'B.Tech (ECE)',
        'B.Tech (EEE)',
        'B.Tech (Biotechnology)',
        'B.Tech (Civil)',
        'B.Tech (Mechanical)',
        'BCA',
        'MCA',
        'B.Sc',
        'B.Sc (Agri)',
        'BBA',
        'MBA',
        'M.Tech',
        
    ],
    yearsOfStudy: ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year'],
    fieldsOfInterest: [
      'Marketing and Strategy',
      'Technology and Development',
      'Finance and Operations',
      'Design and Content Creation',
      'Event Management',
      'Public Relations'
    ],
    rolePreferences: [
      { value: 'management_team', label: 'Management Team' },
      { value: 'domain_leader', label: 'Domain Leader' },
    ],
    timeCommitments: [
      { value: '1-3', label: '1-3 hours' },
      { value: '4-6', label: '4-6 hours' },
    ]
  };

  const requiredFields = [
    'full_name',
    'roll_number',
    'course_branch',
    'year_of_study',
    'contact_number',
    'email',
    'field_of_interest',
    'role_preference',
    'motivation',
    'value_proposition',
    'time_commitment'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAutocompleteChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);
    
    // Trim all string values before validation
    const trimmedData = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key, 
        typeof value === 'string' ? value.trim() : value
      ])
    );

    // Validate contact number
    if (!/^\d{10}$/.test(trimmedData.contact_number)) {
      setErrors(prev => ({
        ...prev,
        contact_number: 'Contact number must be exactly 10 digits'
      }));
      toast.error('Please enter a valid 10-digit contact number');
      setIsSubmitting(false);
      return;
    }

    // Check for empty required fields
    const missingFields = requiredFields.filter(field => {
      const value = trimmedData[field];
      return !value || (typeof value === 'string' && value.length === 0);
    });

    if (missingFields.length > 0) {
      const newErrors = missingFields.reduce((acc, field) => {
        acc[field] = 'This field is required';
        return acc;
      }, {});
      setErrors(newErrors);
      toast.error('Please fill all required fields');
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting data:', trimmedData); // Log the data being sent
      
      const response = await fetch(`${config.Backend_Api}/api/events/join-ecell/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trimmedData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error Response:', errorData);
        
        if (errorData.errors) {
          setErrors(errorData.errors);
          toast.error(errorData.message || 'Validation errors occurred. Please check the form.');
        } else {
          toast.error(errorData.message || 'Failed to submit application. Please try again.');
        }
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);

      // On successful submission
      localStorage.setItem('ecellFormSubmitted', 'true');
      setFormSubmitted(true);
      toast.success('Application submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      if (!error.message.includes('Network response was not ok')) {
        toast.error(error.message || 'Failed to submit application. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add early return if form was submitted
  if (formSubmitted) {
    return null;
  }

  const renderAutocomplete = (name, label, options) => {
    const filterOptions = createFilterOptions({
      matchFrom: 'any',
      stringify: (option) => option.label || option,
    });

    const allowFreeSolo = name === 'course_branch';

    const handleCustomInput = (value) => {
      if (name === 'course_branch') {
        if (value.length < 3 || value.length > 100) {
          setErrors(prev => ({
            ...prev,
            [name]: 'Course branch must be between 3 and 100 characters'
          }));
          return false;
        }
      }
      return true;
    };

    return (
      <Autocomplete
        value={formData[name]}
        onChange={(e, newValue) => {
          const value = newValue?.value || newValue || '';
          if (allowFreeSolo) {
            if (handleCustomInput(value)) {
              handleAutocompleteChange(name, value);
              setErrors(prev => ({ ...prev, [name]: '' }));
            }
          } else {
            handleAutocompleteChange(name, value);
          }
        }}
        onInputChange={(e, newInputValue) => {
          if (allowFreeSolo && !options.includes(newInputValue)) {
            if (handleCustomInput(newInputValue)) {
              handleAutocompleteChange(name, newInputValue);
              setErrors(prev => ({ ...prev, [name]: '' }));
            }
          }
        }}
        options={options}
        filterOptions={filterOptions}
        getOptionLabel={(option) => option.label || option}
        freeSolo={allowFreeSolo}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            required={requiredFields.includes(name)}
            fullWidth
            error={!!errors[name]}
            helperText={errors[name] || (requiredFields.includes(name) && allowFreeSolo ? 'You can select from dropdown or enter your own value' : '')}
          />
        )}
      />
    );
  };

  // Add breadcrumb navigation
  const BreadcrumbNav = () => (
    <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
      <Link
        underline="hover"
        color="inherit"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate('/');
        }}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Home
      </Link>
      <Link
        underline="hover"
        color="inherit"
        href="/join-ecell"
        onClick={(e) => {
          e.preventDefault();
          navigate('/join-ecell');
        }}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <GroupsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
        Join E-Cell
      </Link>
    </Breadcrumbs>
  );

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ 
        minHeight: '100vh',
        py: { xs: 2, sm: 4 },
        px: { xs: 1, sm: 2 },
        backgroundColor: theme.palette.mode === 'dark' ? 'background.default' : 'background.paper'
      }}>
        <Paper elevation={3} sx={{ 
          maxWidth: 1200,
          mx: 'auto',
          p: { xs: 2, sm: 4 },
          backgroundColor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default'
        }}>
          <BreadcrumbNav />
          
          {/* Header Section */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" gutterBottom sx={{ 
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 600 
            }}>
              Join E-Cell
            </Typography>
            <Typography variant="subtitle1" sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', sm: '1rem' },
              maxWidth: 800,
              mx: 'auto'
            }}>
              {pageDescription}
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/* Section Titles */}
            <Typography variant="h5" gutterBottom sx={{ 
              mb: 3,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 500,
              color: 'primary.main'
            }}>
              Basic Information
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  error={!!errors.full_name}
                  helperText={errors.full_name}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Roll Number"
                  name="roll_number"
                  value={formData.roll_number}
                  onChange={handleChange}
                  required
                  error={!!errors.roll_number}
                  helperText={errors.roll_number}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderAutocomplete('course_branch', 'Course Branch', formOptions.courseBranches)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderAutocomplete('year_of_study', 'Year of Study', formOptions.yearsOfStudy)}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Contact Number"
                  name="contact_number"
                  type="tel"
                  value={formData.contact_number}
                  onChange={(e) => {
                    // Allow any input but show error if invalid
                    handleChange(e);
                    // Clear error if input becomes valid
                    if (/^\d{0,10}$/.test(e.target.value)) {
                      setErrors(prev => ({ ...prev, contact_number: '' }));
                    }
                  }}
                  onBlur={(e) => {
                    // Validate on blur
                    if (!/^\d{10}$/.test(e.target.value)) {
                      setErrors(prev => ({
                        ...prev,
                        contact_number: 'Contact number must be exactly 10 digits'
                      }));
                    }
                  }}
                  required
                  error={!!errors.contact_number}
                  helperText={errors.contact_number}
                  size="small"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={!!errors.email}
                  helperText={errors.email}
                  size="small"
                />
              </Grid>
            </Grid>

            {/* Interest & Role Section */}
            <Typography variant="h5" sx={{ 
              mt: 6, 
              mb: 3,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 500,
              color: 'primary.main'
            }} gutterBottom>
              Interest & Role
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                {renderAutocomplete('field_of_interest', 'Field of Interest', formOptions.fieldsOfInterest)}
              </Grid>
              <Grid item xs={12} sm={6}>
                {renderAutocomplete('role_preference', 'Role Preference', formOptions.rolePreferences)}
              </Grid>
            </Grid>

            {/* Motivation & Commitment Section */}
            <Typography variant="h5" sx={{ 
              mt: 6, 
              mb: 3,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 500,
              color: 'primary.main'
            }} gutterBottom>
              Motivation & Commitment
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Motivation"
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  maxRows={8}
                  required
                  error={!!errors.motivation}
                  helperText={errors.motivation}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Value Proposition"
                  name="value_proposition"
                  value={formData.value_proposition}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  maxRows={8}
                  required
                  error={!!errors.value_proposition}
                  helperText={errors.value_proposition}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                {renderAutocomplete('time_commitment', 'Time Commitment', formOptions.timeCommitments)}
              </Grid>
            </Grid>

            {/* Additional Information Section */}
            <Typography variant="h5" sx={{ 
              mt: 6, 
              mb: 3,
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              fontWeight: 500,
              color: 'primary.main'
            }} gutterBottom>
              Additional Information
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="LinkedIn Profile"
                  name="linkedin_profile"
                  type="url"
                  value={formData.linkedin_profile}
                  onChange={handleChange}
                  error={!!errors.linkedin_profile}
                  helperText={errors.linkedin_profile}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Experience Description"
                  name="experience_description"
                  value={formData.experience_description}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  maxRows={8}
                  error={!!errors.experience_description}
                  helperText={errors.experience_description}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  maxRows={8}
                  error={!!errors.skills}
                  helperText={errors.skills}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Portfolio Links"
                  name="portfolio_links"
                  value={formData.portfolio_links}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  maxRows={8}
                  error={!!errors.portfolio_links}
                  helperText={errors.portfolio_links}
                  size="small"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Startup Ideas Description"
                  name="startup_ideas_description"
                  value={formData.startup_ideas_description}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  maxRows={8}
                  error={!!errors.startup_ideas_description}
                  helperText={errors.startup_ideas_description}
                  size="small"
                />
              </Grid>
            </Grid>

            {/* Checkboxes Section */}
            <Grid container spacing={3} sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="team_work_comfort"
                      checked={formData.team_work_comfort}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Are you comfortable working in teams?"
                  sx={{ '& .MuiTypography-root': { fontSize: { xs: '0.9rem', sm: '1rem' } } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="has_experience"
                      checked={formData.has_experience}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Do you have any previous experience?"
                  sx={{ '& .MuiTypography-root': { fontSize: { xs: '0.9rem', sm: '1rem' } } }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="has_startup_ideas"
                      checked={formData.has_startup_ideas}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="Do you have any startup ideas?"
                  sx={{ '& .MuiTypography-root': { fontSize: { xs: '0.9rem', sm: '1rem' } } }}
                />
              </Grid>
            </Grid>

            {/* Suggestions */}
            <Grid container spacing={3} sx={{ mt: 4 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Suggestions"
                  name="suggestions"
                  value={formData.suggestions}
                  onChange={handleChange}
                  multiline
                  minRows={2}
                  maxRows={8}
                  error={!!errors.suggestions}
                  helperText={errors.suggestions}
                  size="small"
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box sx={{ 
              mt: 6,
              display: 'flex',
              justifyContent: 'center'
            }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
                sx={{
                  minWidth: 200,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500,
                  position: 'relative'
                }}
              >
                {isSubmitting ? (
                  <>
                    Submitting...
                    <CircularProgress
                      size={24}
                      sx={{
                        position: 'absolute',
                        right: 16,
                        color: 'inherit'
                      }}
                    />
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
}


