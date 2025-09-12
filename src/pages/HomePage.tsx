import { 
  Text, 
  Card, 
  Button,
  mergeClasses,
  makeStyles,
  shorthands
} from "@fluentui/react-components";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { 
  DocumentText24Regular, 
  People24Regular, 
  Book24Regular, 
  Heart24Regular 
} from "@fluentui/react-icons";
import { useNavigate } from "react-router-dom";
import jesus from '../assets/jesus-mosaic.jpg';
import { useSendEmail } from "../hooks/useSendEmail";
import { useEffect } from "react";

const useStyles = makeStyles({
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f8ff 0%, #ffffff 50%, #f8f0ff 100%)",
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
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    ...shorthands.gap("32px"),
    ...shorthands.margin("48px", "0"),
  },
  optionCard: {
    cursor: "pointer",
    transition: "all 0.2s ease",
    ":hover": {
      transform: "scale(1.02)",
      boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
    },
  },
  bulletinCard: {
    backgroundColor: "#f0f8ff",
  },
  involvedCard: {
    backgroundColor: "#f0fff0",
  },
  bibleStudyCard: {
    backgroundColor: "#f8f0ff",
  },
  membershipCard: {
    backgroundColor: "#fff8f0",
  },
  iconContainer: {
    width: "80px",
    height: "80px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    ...shorthands.margin("0", "auto", "16px"),
  },
  cardButton: {
    width: "100%",
    height: "auto",
    ...shorthands.padding("32px"),
    backgroundColor: "transparent",
    border: "none",
  },
});

const options = [
  {
    id: "bulletin",
    title: "Get Today's Bulletin",
    description: "View today's service information",
    icon: DocumentText24Regular,
    cardStyle: "bulletinCard"
  },
  {
    id: "volunteer",
    title: "I Want to Get Involved",
    description: "Volunteer opportunities and ministries",
    icon: People24Regular,
    cardStyle: "involvedCard"
  },
  {
    id: "bible-study",
    title: "I'd Like Bible Study",
    description: "Find Bible study groups and classes",
    icon: Book24Regular,
    cardStyle: "bibleStudyCard"
  },
  {
    id: "membership",
    title: "I Want to Become a Member",
    description: "Start your journey as a church member",
    icon: Heart24Regular,
    cardStyle: "membershipCard"
  }
];

export default function HomePage() {
  const styles = useStyles();
  const navigate = useNavigate();
  const { error, resetState, success } = useSendEmail();

  useEffect(() => {
    if (success) {
    }
    if (error) {
    }
  }, [success, error]);

  const handleOptionClick = (optionId: string) => {
    switch (optionId) {
      case 'bulletin':
        navigate('/bulletin');
        break;
        case 'volunteer':
        navigate('/volunteer');
        break;
        case 'bible-study':
        navigate('/bible-study');
        break;
        case 'membership':
        navigate('/membership');
        break;
      default:
        console.log(`Selected: ${optionId}`);
        // For other options, we'll add routing later
        break;
    }
  };

  return (
    <div className={styles.container}>
      {/* Header with background image */}
      <div className={styles.headerContainer}>
        <ImageWithFallback
          src={jesus}
          alt="Welcoming church interior"
          className={styles.headerImage}
        />
        <div className={styles.headerOverlay}>
        </div>
      </div>

      {/* Main content */}
      <div className={styles.mainContent}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
          <Text size={800} weight="semibold" style={{ fontSize: "40px", color: "#323130" }}>
            We're Glad You're Here
          </Text>
          <Text size={500} style={{ 
            maxWidth: "600px", 
            textAlign: "center", 
            color: "#605e5c",
            fontSize: "20px",
            lineHeight: "1.4"
          }}>
            How can we support you on your spiritual journey?
          </Text>
        </div>

        {/* Options grid */}
        <div className={styles.optionsGrid}>
          {options.map((option) => {
            const IconComponent = option.icon;
            return (
              <Card 
                key={option.id} 
                className={mergeClasses(styles.optionCard, styles[option.cardStyle as keyof typeof styles])}
                appearance="filled-alternative"
              >
                <Button 
                  appearance="transparent"
                  className={styles.cardButton}
                  onClick={() => handleOptionClick(option.id)}
                >
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
                    <div className={styles.iconContainer}>
                      <IconComponent style={{ fontSize: "32px", color: "#323130" }} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                      <Text size={600} weight="semibold" style={{ 
                        color: "#323130",
                        fontSize: "24px",
                        textAlign: "center"
                      }}>
                        {option.title}
                      </Text>
                      <Text size={400} style={{ 
                        color: "#605e5c",
                        textAlign: "center",
                        fontSize: "16px",
                        lineHeight: "1.4"
                      }}>
                        {option.description}
                      </Text>
                    </div>
                  </div>
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: "64px" }}>
          <Text size={400} style={{ color: "#8a8886" }}>
            Need assistance? Please ask a member of our welcome team.
          </Text>
        </div>
      </div>
    </div>
  );
}