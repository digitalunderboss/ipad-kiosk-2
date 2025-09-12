import { 
  FluentProvider, 
  webLightTheme, 
  Text, 
  Card, 
  Button,
  Label,
  makeStyles,
  shorthands
} from "@fluentui/react-components";
import { 
  ArrowLeft24Regular,
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSendEmail } from "../hooks/useSendEmail";
import jesus from '../assets/jesus-mosaic.jpg';

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
});

export default function MembershipPage() {
  const navigate = useNavigate();
  const styles = useStyles();
  const { isLoading, error, success, sendEmail, resetState } = useSendEmail();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  // Check if form is valid (both fields have content)
  const isFormValid = formData.name.trim() !== '' && formData.email.trim() !== '';

  const handleInputChange = (field: 'name' | 'email', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      await sendEmail({
        name: formData.name,
        email: formData.email,
        type: 'Membership'
      });
    }
  };

  // Reset form after successful submission
  useEffect(() => {
    if (success) {
      setFormData({ name: '', email: '' });
      navigate('/');
      // Success toast!
    }
    if (error) {
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
          src={jesus}
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
             Come fellowship with us
            </Text>
            <Text size={500} style={{ 
              maxWidth: "600px", 
              textAlign: "center", 
              color: "#605e5c",
              fontSize: "20px",
              lineHeight: "1.4"
            }}>
              Fill out your information so we can contact you.
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
          
          <Text size={400} style={{ color: "#8a8886", textAlign: "center", maxWidth: "500px" }}>
            We'll contact you about membership and next steps.
          </Text>
        </div>
      </div>
    </div>
    </FluentProvider>
  );
}