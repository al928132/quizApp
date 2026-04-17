import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Question({ route, navigation }) {
  const { data, index, answers } = route.params;
  const question = data[index];
  const [selected, setSelected] = useState(
    question.type === 'multiple-answer' ? [] : null
  );

  const handleSelect = (value) => {
    if (question.type === 'multiple-answer') {
      setSelected((prev) => {
        if (prev.includes(value)) {
          return prev.filter((v) => v !== value);
        }
        return [...prev, value];
      });
    } else {
      setSelected(value);
    }
  };

  const handleNext = () => {
    const newAnswers = [...answers, selected];
    const nextIndex = index + 1;
    if (nextIndex >= data.length) {
      navigation.replace('Summary', { data, answers: newAnswers });
    } else {
      navigation.replace('Question', {
        data,
        index: nextIndex,
        answers: newAnswers,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>
        Question {index + 1} of {data.length}
      </Text>
      <Text style={styles.prompt}>{question.prompt}</Text>
      <View style={styles.choicesContainer}>
        {question.choices.map((choice, idx) => {
          const isSelected =
            question.type === 'multiple-answer'
              ? selected.includes(idx)
              : selected === idx;
          return (
            <TouchableOpacity
              key={idx}
              testID={`choice-${idx}`}
              style={[styles.choiceButton, isSelected && styles.choiceButtonSelected]}
              onPress={() => handleSelect(idx)}
            >
              <Text style={[styles.choiceText, isSelected && styles.choiceTextSelected]}>
                {choice}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
        testID="next-question"
        style={[
          styles.nextButton,
          selected === null && question.type !== 'multiple-answer' && styles.nextButtonDisabled,
        ]}
        onPress={handleNext}
        disabled={
          question.type === 'multiple-answer'
            ? false
            : selected === null
        }
      >
        <Text style={styles.nextButtonText}>
          {index + 1 === data.length ? 'See Results' : 'Next Question'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  progress: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
  },
  prompt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  choicesContainer: {
    marginBottom: 24,
  },
  choiceButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
  },
  choiceButtonSelected: {
    backgroundColor: '#4a90e2',
    borderColor: '#4a90e2',
  },
  choiceText: {
    fontSize: 16,
    color: '#333',
  },
  choiceTextSelected: {
    color: '#fff',
  },
  nextButton: {
    backgroundColor: '#4a90e2',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#aaa',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
