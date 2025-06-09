import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, TextField, Paper, MenuItem, CircularProgress, Alert } from '@mui/material';
import axios from 'axios';

const questions = [
  {
    label: 'Question 1',
    url: 'https://raw.githubusercontent.com/TharushaAkash/OOP-Final/main/Questions/Q1.txt'
  },
  {
    label: 'Question 2',
    url: 'https://raw.githubusercontent.com/TharushaAkash/OOP-Final/main/Questions/Q2.txt'
  },
  {
    label: 'Question 3',
    url: 'https://raw.githubusercontent.com/TharushaAkash/OOP-Final/main/Questions/Q3.txt'
  },
  {
    label: 'Question 4',
    url: 'https://raw.githubusercontent.com/TharushaAkash/OOP-Final/main/Questions/Q4.txt'
  },
  {
    label: 'Question 5A',
    url: 'https://raw.githubusercontent.com/TharushaAkash/OOP-Final/main/Questions/Q5A.txt'
  },
  {
    label: 'Question 5B',
    url: 'https://raw.githubusercontent.com/TharushaAkash/OOP-Final/main/Questions/Q5B.txt'
  }
];

function App() {
  const [selected, setSelected] = useState(0);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setQuestion('');
    setAnswer('');
    setResult('');
    setError('');
    fetch(questions[selected].url)
      .then(res => res.text())
      .then(setQuestion)
      .catch(() => setQuestion('Failed to load question.'));
  }, [selected]);

  const handleSubmit = async () => {
    setLoading(true);
    setResult('');
    setError('');
    try {
      const res = await axios.post('https://oop-backend.onrender.com/api/evaluate', {
        question: question,
        answer: answer
      });
      setResult(res.data.result);
    } catch (e) {
      setError('Failed to evaluate answer.');
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h3" align="center" gutterBottom color="primary">
          OOP Coding Exam
        </Typography>
        <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
          {questions.map((q, i) => (
            <Button
              key={q.label}
              variant={selected === i ? 'contained' : 'outlined'}
              onClick={() => setSelected(i)}
              color="secondary"
            >
              {q.label}
            </Button>
          ))}
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" color="text.secondary">Question:</Typography>
          <Paper sx={{ p: 2, background: '#f9f9f9', mb: 2, minHeight: 100 }}>
            <Typography sx={{ whiteSpace: 'pre-line' }}>{question}</Typography>
          </Paper>
        </Box>
        <TextField
          label="Your Answer"
          multiline
          minRows={8}
          fullWidth
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSubmit}
          disabled={loading || !answer}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit Answer'}
        </Button>
        {result && (
          <Alert severity="success" sx={{ mt: 3, whiteSpace: 'pre-line' }}>
            {result}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Paper>
      <Typography align="center" sx={{ mt: 4, color: '#888' }}>
        Powered by AI Marking | &copy; {new Date().getFullYear()}
      </Typography>
    </Container>
  );
}

export default App;
