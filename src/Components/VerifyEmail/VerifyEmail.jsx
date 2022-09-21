import React, { useEffect, useState } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const VerifyEmail = () => {
  const { currentUser, sendVerificationEmail } = useAuth();
  const [timer, setTimer] = useState(0);
  const [timerText, setTimerText] = useState(`in 00`);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [emailSent, setEmailSent] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        setTimerText(`in ${timer}`);
      } else {
        clearInterval(myInterval);
        setTimer();
        setTimerText();
        setDisabled(false);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  const handleSubmit = async (e) => {
    setTimer(15);
    setEmailSent(true);
    setMessage("Verification email sent Successful");

    try {
      await sendVerificationEmail();
    } catch (e) {
      setError(`Failed to send verification email: ${e.code}`);
    }
  };

  if (currentUser.emailVerified) navigate("/");

  return (
    <Card>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <h2 className="text-center mb-4">Email Verification</h2>
        {error && (
          <Alert className="text-center" variant="danger">
            {error}
          </Alert>
        )}
        {message && (
          <Alert className="text-center" variant="success">
            {message}
          </Alert>
        )}
        <p className="text-center">
          An email with verification link has been sent to{" "}
          <strong>{currentUser.email}</strong>. If you haven't received it,
          Check SPAM Folder
        </p>
        {emailSent ? (
          <p className="text-center">Didn't receive email?</p>
        ) : (
          <p className="text-center">Click below to send verification email?</p>
        )}
        <div className="d-flex justify-content-around w-100">
          {emailSent ? (
            <>
              <Button
                variant="outline-primary"
                disabled={disabled}
                onClick={() => {
                  setTimerText(`in 15`);
                  setDisabled(true);
                  handleSubmit();
                }}
                style={{ width: "100%", maxWidth: "150px" }}
              >
                Re-send {timerText}
              </Button>
              <Button
                variant="primary"
                disabled={!currentUser.emailVerified}
                onClick={() => navigate("/")}
                style={{ width: "100%", maxWidth: "150px" }}
              >
                Verify
              </Button>
            </>
          ) : (
            <Button
              variant="outline-primary"
              disabled={disabled}
              onClick={() => {
                setTimerText(`in 15`);
                setDisabled(true);
                handleSubmit();
              }}
              style={{ width: "100%" }}
            >
              Send Verification Email
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default VerifyEmail;
