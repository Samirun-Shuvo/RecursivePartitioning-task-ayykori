import { useState } from "react";

const TaskTwo = () => {
  const [outputString, setOutputString] = useState('');

  const handleClick = (letter) => {
    const newOutputString = outputString + letter;
    const updatedOutputString = replaceConsecutiveLetters(newOutputString);
    setOutputString(updatedOutputString);
  };

  const replaceConsecutiveLetters = (str) => {
    let result = '';
    let count = 1;

    for (let i = 1; i <= str.length; i++) {
      if (str[i] === str[i - 1]) {
        count++;
      } else {
        if (count >= 3) {
          result += '_'.repeat(count);
        } else {
          result += str.slice(i - count, i);
        }
        count = 1; // Reset count for the new character
      }
    }

    return result;
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-6 gap-2">
        {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
          <button
            key={letter}
            className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => handleClick(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
      <div id="outputString" className="mt-4 p-4 bg-gray-200 border border-gray-300 rounded-lg">
        {outputString}
      </div>
    </div>
  );
};

export default TaskTwo;
