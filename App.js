import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import QuestionScreen from './components/Question';
import SummaryScreen from './components/Summary';

const Stack = createStackNavigator();

// Export Question and Summary components as required
export { default as Question } from './components/Question';
export { default as Summary } from './components/Summary';

// Sample questions with correct answers:
// Q1 (multiple-choice): "Which planet is closest to the Sun?" correct: 0 ("Mercury")
// Q2 (multiple-answer): "Which of the following are primary colors?" correct: [0,2] ("Red", "Blue")
// Q3 (true-false): "The Earth is the third planet from the Sun." correct: 0 ("True")
// Q4 (multiple-choice): "What is 2 + 2?" correct: 1 ("4")
// Q5 (multiple-answer): "Which are mammals?" correct: [0,3] ("Dog", "Whale")
const QUESTIONS = [
  {
    prompt: 'Which planet is closest to the Sun?',
    type: 'multiple-choice',
    choices: ['Mercury', 'Venus', 'Earth', 'Mars'],
    correct: 0,
  },
  {
    prompt: 'Which of the following are primary colors (additive)?',
    type: 'multiple-answer',
    choices: ['Red', 'Yellow', 'Blue', 'Green'],
    correct: [0, 2],
  },
  {
    prompt: 'The Earth is the third planet from the Sun.',
    type: 'true-false',
    choices: ['True', 'False'],
    correct: 0,
  },
  {
    prompt: 'What is 2 + 2?',
    type: 'multiple-choice',
    choices: ['3', '4', '5', '6'],
    correct: 1,
  },
  {
    prompt: 'Which of the following are mammals?',
    type: 'multiple-answer',
    choices: ['Dog', 'Salmon', 'Eagle', 'Whale'],
    correct: [0, 3],
  },
];

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Question"
          component={QuestionScreen}
          initialParams={{ data: QUESTIONS, index: 0, answers: [] }}
        />
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
