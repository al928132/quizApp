import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

function isCorrect(question, userAnswer) {
  if (question.type === 'multiple-answer') {
    const correct = [...question.correct].sort().join(',');
    const user = userAnswer ? [...userAnswer].sort().join(',') : '';
    return correct === user;
  }
  return userAnswer === question.correct;
}

export default function Summary({ route }) {
  const { data, answers } = route.params;

  let score = 0;
  data.forEach((q, i) => {
    if (isCorrect(q, answers[i])) score++;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Quiz Summary</Text>
      <Text testID="total" style={styles.total}>
        Score: {score} / {data.length}
      </Text>

      {data.map((question, qi) => {
        const userAnswer = answers[qi];
        const correct = isCorrect(question, userAnswer);

        // Normalize answers to arrays for rendering
        const correctArr = Array.isArray(question.correct)
          ? question.correct
          : [question.correct];
        const userArr = question.type === 'multiple-answer'
          ? (userAnswer || [])
          : userAnswer !== null && userAnswer !== undefined
            ? [userAnswer]
            : [];

        return (
          <View key={qi} style={[styles.card, correct ? styles.correctCard : styles.incorrectCard]}>
            <Text style={styles.questionPrompt}>{question.prompt}</Text>
            <Text style={styles.resultLabel}>
              {correct ? '✓ Correct' : '✗ Incorrect'}
            </Text>
            {question.choices.map((choice, ci) => {
              const isCorrectChoice = correctArr.includes(ci);
              const userChose = userArr.includes(ci);

              let textStyle = styles.choiceText;

              if (isCorrectChoice) {
                // Always bold the correct answer
                textStyle = [styles.choiceText, styles.choiceBold];
              } else if (userChose && !isCorrectChoice) {
                // User chose incorrectly: strikethrough
                textStyle = [styles.choiceText, styles.choiceStrike];
              }

              return (
                <Text key={ci} style={[styles.choiceItem, textStyle]}>
                  {isCorrectChoice ? '✓ ' : userChose ? '✗ ' : '  '}
                  {choice}
                </Text>
              );
            })}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    marginTop: 40,
  },
  total: {
    fontSize: 20,
    color: '#4a90e2',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 5,
  },
  correctCard: {
    borderLeftColor: '#4caf50',
  },
  incorrectCard: {
    borderLeftColor: '#f44336',
  },
  questionPrompt: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  choiceItem: {
    fontSize: 15,
    paddingVertical: 2,
    color: '#333',
  },
  choiceText: {
    fontSize: 15,
    color: '#333',
  },
  choiceBold: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  choiceStrike: {
    textDecorationLine: 'line-through',
    color: '#c62828',
  },
});
