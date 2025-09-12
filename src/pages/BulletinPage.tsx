import { 
  FluentProvider, 
  webLightTheme, 
  Text, 
  Card, 
  Button,
  makeStyles,
  shorthands
} from "@fluentui/react-components";
import { 
  ArrowLeft24Regular,
  QrCode24Regular
} from "@fluentui/react-icons";
import jesus from '../assets/jesus-mosaic.jpg';
import bulletin from '../assets/bulletin.png';

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
});
import { useNavigate } from "react-router-dom";

export default function BulletinPage() {
  const navigate = useNavigate();
  const styles = useStyles();

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

      {/* Main bulletin content */}
      <div className={styles.mainContent}>
        <div className={styles.bulletinContainer}>
          <Card className={styles.qrCodeCard} appearance="filled-alternative">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
              <QrCode24Regular style={{ fontSize: "48px", color: "#d69e2e" }} />
              <Text size={600} weight="semibold" style={{ color: "#323130", textAlign: "center" }}>
                Scan with Your Phone
              </Text>
              
              {/* QR Code placeholder - in production this would be a real QR code */}
              <div className={styles.qrCodeContainer}>
                <img
                  src={bulletin}
                  alt="Bulletin QR Code"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
    </FluentProvider>
  );
}