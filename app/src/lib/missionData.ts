import { TransferEvaluation } from './types';

export interface ExpenseRecord {
  category: string;
  amount: number;
}

export interface ReadingRecord {
  day: string;
  minutes: number;
}

export const ORIGINAL_MISSION = {
  id: 'expense-grouping',
  title: 'Category Totals Accumulation',
  learningObjective: 'Iterate over records and build a category-to-total map.',
  contextNote: 'This is practice, not a grade. Take small steps to build lasting mental models.',
  taskPrompt: 'Given a list of expenses, return the total amount for each category.',
  sampleInput: [
    { category: 'food', amount: 12 },
    { category: 'travel', amount: 8 },
    { category: 'food', amount: 5 },
  ] as ExpenseRecord[],
  expectedOutput: {
    food: 17,
    travel: 8,
  },
  starterCode: `function getTotalByCategory(expenses) {
  // Your code here:
  const totals = {};
  
  return totals;
}`,
};

export const HINT_LADDER = {
  nudge: {
    level: 'nudge' as const,
    label: '1. Nudge (Recommended)',
    summary: 'A small directional question to test your mental model.',
    content: 'What should one property in the result represent?',
    subtext: 'Think of the final object: every key should be a distinct category name (like "food"), and its value should be the accumulated sum of all amounts recorded for that category.',
  },
  guided: {
    level: 'guided' as const,
    label: '2. Guided step',
    summary: 'The exact procedural logic broken into simple decisions.',
    content: 'As you visit each expense, check whether its category already has a total. If it does, add the amount. If not, start that total.',
    subtext: 'In code, that looks like: if (category in totals) { totals[category] += amount; } else { totals[category] = amount; }',
  },
  explanation: {
    level: 'explanation' as const,
    label: '3. Worked explanation & pseudocode',
    summary: 'A structured breakdown of the accumulator pattern.',
    content: `// 1. Create an empty accumulator dictionary:
const totals = {};

// 2. Loop through every expense record in the array:
for (const item of expenses) {
  const cat = item.category;
  const amt = item.amount;
  
  // 3. If the key exists, add to it; otherwise initialize it
  if (totals[cat] !== undefined) {
    totals[cat] += amt;
  } else {
    totals[cat] = amt;
  }
}

// 4. Return the populated totals object:
return totals;`,
    subtext: 'Notice how the object acts as a dictionary. Each iteration checks and updates the specific bucket.',
    disclaimer: 'Prototype coaching content. Fixed scripted support, not live AI generated.',
  },
};

export const EXPLAIN_BACK = {
  prompt: 'In one or two sentences, how does the running total change as you read each item?',
  reassurance: 'Imperfect wording is completely okay! This is active retrieval reflection to anchor the concept in your own words, not an AI-scored test.',
  examplePlaceholder: 'e.g., As we inspect each expense, if the category is new we set its starting total, and if we have seen it before we add the new amount to what was already accumulated...',
};

export const TRANSFER_MISSION = {
  id: 'reading-minutes-transfer',
  title: 'Transfer Task: Reading Minutes by Day',
  badge: 'Try this one without AI or hints',
  taskPrompt: 'Given reading minutes recorded across several days, return the total minutes for each day.',
  instructions: 'Use the same accumulator concept on this new dataset. Notice the property names and records are different, but the grouping pattern is identical.',
  sampleInput: [
    { day: 'Monday', minutes: 30 },
    { day: 'Tuesday', minutes: 45 },
    { day: 'Monday', minutes: 20 },
    { day: 'Wednesday', minutes: 15 },
  ] as ReadingRecord[],
  expectedOutput: {
    Monday: 50,
    Tuesday: 45,
    Wednesday: 15,
  },
  starterCode: `function getTotalMinutesByDay(records) {
  // Try rebuilding the grouping pattern on your own:
  const totals = {};
  
  return totals;
}`,
  emergencyHint: {
    label: 'Single Transfer Hint',
    text: 'Iterate over records with for (const r of records). Check if totals[r.day] exists. If yes, add r.minutes; otherwise assign r.minutes.',
  },
};

/**
 * Transparent evaluation of JavaScript solution for the Transfer task.
 * Evaluates the user code against the sample transfer dataset.
 */
export function evaluateTransferCode(codeString: string): TransferEvaluation {
  const testInput = [
    { day: 'Monday', minutes: 30 },
    { day: 'Tuesday', minutes: 45 },
    { day: 'Monday', minutes: 20 },
    { day: 'Wednesday', minutes: 15 },
  ];
  
  const expectedOutput: Record<string, number> = {
    Monday: 50,
    Tuesday: 45,
    Wednesday: 15,
  };

  try {
    // Basic syntax/empty check
    if (!codeString || codeString.trim().length === 0) {
      return {
        passed: false,
        expectedOutput,
        errorMessage: 'Answer is empty. Please enter your JavaScript solution.',
      };
    }

    // Prepare safe runner for the function
    // Expecting either function getTotalMinutesByDay(records) or a function expression or return statement
    const runnerFunction = new Function(
      'records',
      `
      try {
        ${codeString}
        
        // If user defined function getTotalMinutesByDay, invoke it:
        if (typeof getTotalMinutesByDay === 'function') {
          return getTotalMinutesByDay(records);
        }
        
        // If code defined 'totals' and didn't wrap in function:
        if (typeof totals !== 'undefined') {
          return totals;
        }

        return undefined;
      } catch (err) {
        throw err;
      }
      `
    );

    const actual = runnerFunction(testInput);

    if (actual === undefined || actual === null || typeof actual !== 'object') {
      return {
        passed: false,
        actualOutput: null,
        expectedOutput,
        errorMessage: 'Function did not return an object with daily totals.',
      };
    }

    // Compare keys and numeric values
    const expectedKeys = Object.keys(expectedOutput).sort();
    const actualKeys = Object.keys(actual).sort();

    const keysMatch = 
      expectedKeys.length === actualKeys.length &&
      expectedKeys.every((key, idx) => key === actualKeys[idx]);

    if (!keysMatch) {
      return {
        passed: false,
        actualOutput: actual,
        expectedOutput,
        errorMessage: `Keys do not match expected days. Expected [${expectedKeys.join(', ')}], got [${actualKeys.join(', ')}].`,
      };
    }

    const valuesMatch = expectedKeys.every(
      (key) => Number(actual[key]) === expectedOutput[key]
    );

    if (!valuesMatch) {
      return {
        passed: false,
        actualOutput: actual,
        expectedOutput,
        errorMessage: 'Totals for one or more days did not match expected sum.',
      };
    }

    return {
      passed: true,
      actualOutput: actual,
      expectedOutput,
    };
  } catch (err: any) {
    return {
      passed: false,
      actualOutput: null,
      expectedOutput,
      errorMessage: err?.message || 'Error executing JavaScript solution.',
    };
  }
}
