import { 
  FluentProvider, 
  webLightTheme, 
  Text, 
  Card, 
  Button,
  Label,
  Checkbox,
  makeStyles,
  shorthands
} from "@fluentui/react-components";
import { 
  ArrowLeft24Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSendEmail } from "../hooks/useSendEmail";
import church from '../assets/church.jpeg';

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fdf5e6 0%, #ffffff 50%, #f5f0e8 100%)",
  },
  headerContainer: {
    position: "relative",
    height: "300px",
    overflow: "hidden",
  },
  headerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  headerOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(to top, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    ...shorthands.padding("48px", "32px"),
  },
  bulletinContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...shorthands.gap("32px"),
    ...shorthands.padding("48px", "32px"),
  },
  qrCodeCard: {
    backgroundColor: "#ffffff",
    ...shorthands.padding("48px"),
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...shorthands.gap("24px"),
    maxWidth: "500px",
    width: "100%",
  },
  qrCodeContainer: {
    backgroundColor: "#f8f9fa",
    ...shorthands.padding("24px"),
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: "32px",
    left: "32px",
    backgroundColor: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(8px)",
    ...shorthands.padding("12px", "20px"),
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    ...shorthands.gap("8px"),
    boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...shorthands.gap("24px"),
    ...shorthands.padding("24px", "32px"),
  },
  formCard: {
    backgroundColor: "#ffffff",
    ...shorthands.padding("48px"),
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    ...shorthands.gap("32px"),
    maxWidth: "800px",
    width: "100%",
  },
  inputField: {
    width: "100%",
    ...shorthands.margin("8px", "0"),
  },
  inputWrapper: {
    width: "100%",
    position: "relative",
  },
  luxuryInput: {
    ...shorthands.padding("20px", "24px"),
    fontSize: "20px",
    lineHeight: "1.5",
    borderRadius: "16px",
    border: "3px solid #e8e8e8",
    backgroundColor: "#fafbfc",
    fontWeight: "400",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08), inset 0 2px 4px rgba(0,0,0,0.03)",
    color: "#2d2d2d",
    width: "100%",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
    ":focus": {
      outline: "none",
      border: "3px solid #d69e2e",
      backgroundColor: "#ffffff",
      boxShadow: "0 6px 20px rgba(214, 158, 46, 0.15), inset 0 2px 4px rgba(0,0,0,0.03)",
      transform: "translateY(-2px)",
    },
    "::placeholder": {
      color: "#999999",
      fontSize: "18px",
      fontStyle: "italic",
      opacity: "0.8",
    },
  },
  inputLabel: {
    display: "block",
    ...shorthands.margin("0", "0", "8px", "0"),
    fontSize: "16px",
    fontWeight: "600",
    color: "#323130",
  },
  submitButton: {
    ...shorthands.padding("12px", "32px"),
    backgroundColor: "#d69e2e",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "16px",
    transition: "all 0.2s ease",
  },
  submitButtonDisabled: {
    ...shorthands.padding("12px", "32px"),
    backgroundColor: "#cccccc",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "16px",
    cursor: "not-allowed",
    opacity: "0.6",
  },
  checkboxGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    ...shorthands.gap("12px"),
    width: "100%",
    ...shorthands.margin("16px", "0"),
  },
  checkboxWrapper: {
    display: "flex",
    alignItems: "center",
    fontSize: "10px",
    fontWeight: "600",
    ...shorthands.gap("8px"),
  },
});

export default function VolunteerPage() {
  const navigate = useNavigate();
  const styles = useStyles();
  const { isLoading, error, success, sendEmail, resetState } = useSendEmail();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    interests: [] as string[]
  });

  const volunteerOptions = [
    'ANYA (Young Adult +18yr)',
    'AV (Audio/Visual)',
    'AY (Adventist Youth)',
    'Deacon/Deaconess',
    'Decorating Committee',
    'Health Ministry',
    'Homeless Ministry',
    'Men\'s Ministry',
    'Pathfinders',
    'Personal Ministry',
    'Women\'s Ministry',
  ];

  // Check if form is valid (both fields have content and at least one checkbox is selected)
  const isFormValid = formData.name.trim() !== '' && 
                     formData.email.trim() !== '' && 
                     formData.interests.length > 0;

  const handleInputChange = (field: 'name' | 'email', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, option]
        : prev.interests.filter(interest => interest !== option)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      await sendEmail({
        name: formData.name,
        email: formData.email,
        type: 'Volunteer',
        interests: formData.interests.join(', '),
      });
    }
  };

  // Reset form after successful submission
  useEffect(() => {
    if (success) {
      setFormData({ name: '', email: '', interests: [] });
      navigate('/');
      // Success toast!
    }
    if (error) {
      setFormData({ name: '', email: '', interests: [] });
      navigate('/');
        //Error toast and try again!
        // We don't need to reset state here since the error will be cleared when user tries again
    }
  }, [success, error, navigate]);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <FluentProvider theme={webLightTheme}>
     <div className={styles.container}>
      {/* Header with background image */}
      <div className={styles.headerContainer}>
        <img
          src={church}
          alt="Mosaic of Jesus holding a book"
          className={styles.headerImage}
        />
        <div className={styles.headerOverlay}>
        </div>
        
        {/* Back button */}
        <Button 
          appearance="subtle"
          className={styles.backButton}
          onClick={handleBackClick}
        >
          <ArrowLeft24Regular style={{ fontSize: "20px" }} />
          <Text size={400} weight="medium">Back to Main Menu</Text>
        </Button>
      </div>

      {/* Main Membership content */}
      <div className={styles.mainContent}>
        <div className={styles.formContainer}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
            <Text size={800} weight="semibold" style={{ fontSize: "40px", color: "#323130" }}>
             Become a Christ-like Servant Leader.
            </Text>
          </div>

          <Card className={styles.formCard} appearance="filled-alternative">
            <Text size={600} weight="semibold" style={{ color: "#323130", textAlign: "center", marginBottom: "12px" }}>
              Contact Information
            </Text>
            
            <form onSubmit={handleSubmit} style={{ width: "100%", display: "flex", flexDirection: "column", gap: "32px" }}>
              <div className={styles.inputWrapper}>
                <Label className={styles.inputLabel} htmlFor="name-input">
                  Full Name *
                </Label>
                <input
                  id="name-input"
                  className={styles.luxuryInput}
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div className={styles.inputWrapper}>
                <Label className={styles.inputLabel} htmlFor="email-input">
                  Email Address *
                </Label>
                <input
                  id="email-input"
                  type="email"
                  className={styles.luxuryInput}
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputWrapper}>
                <Label className={styles.inputLabel}>
                  Ministries of Interest * (Select at least one)
                </Label>
                <div className={styles.checkboxGrid}>
                  {volunteerOptions.map((option) => (
                    <div key={option} className={styles.checkboxWrapper}>
                      <Checkbox
                        size="large"
                        label={option}
                        checked={formData.interests.includes(option)}
                        onChange={(_, data) => handleCheckboxChange(option, data.checked === true)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                appearance="primary"
                className={isFormValid && !isLoading ? styles.submitButton : styles.submitButtonDisabled}
                size="large"
                type="submit"
                disabled={!isFormValid || isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </Card>
          
        </div>
      </div>
    </div>
    </FluentProvider>
  );
}