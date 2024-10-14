import _ from "lodash";

/**
 * Get the differences between two objects, including nested properties and arrays of objects.
 * It returns only the modified or new properties.
 *
 * @param obj1 - The original object.
 * @param obj2 - The updated object to compare with.
 * @returns An object with only the modified or new properties.
 */
export function getObjectDifference<T extends object>(
  obj1: T,
  obj2: T
): Partial<T> {
  return _.transform(
    obj2,
    (result, value, key) => {
      const originalValue = obj1[key as keyof T];

      if (_.isArray(value) && _.isArray(originalValue)) {
        // If it's an array of objects, compare each element deeply
        const arrayDiff = value.filter(
          (item, index) => !_.isEqual(item, originalValue[index])
        );

        if (arrayDiff.length > 0) {
          (result as any)[key] = value;
        }
      } else if (_.isObject(value) && _.isObject(originalValue)) {
        // Recursively find differences in nested objects
        const nestedDiff = getObjectDifference(originalValue, value);
        if (!_.isEmpty(nestedDiff)) {
          (result as any)[key] = nestedDiff;
        }
      } else if (!_.isEqual(value, originalValue)) {
        // Add primitive differences directly
        (result as any)[key] = value;
      }
    },
    {} as Partial<T>
  );
}

// Example usage

/**
interface Hobby {
  id: number;
  name: string;
}

interface User {
  name: string;
  age: number;
  hobbies: Hobby[];
  address: {
    city: string;
    pin: number;
    landmarks: string[];
  };
}

const original: User = {
  name: 'Alice',
  age: 25,
  hobbies: [
    { id: 1, name: 'Reading' },
    { id: 2, name: 'Writing' },
  ],
  address: {
    city: 'Kolkata',
    pin: 700001,
    landmarks: ['Park Street'],
  },
};

const updated: User = {
  name: 'Alice',
  age: 26,
  hobbies: [
    { id: 1, name: 'Reading' }, // No change
    { id: 2, name: 'Watching movies' }, // Modified name
  ],
  address: {
    city: 'Mumbai', // Modified city
    pin: 700001,
    landmarks: ['Marine Drive', 'Gateway of India'], // New elements
  },
};

const differences = getObjectDifference(original, updated);
console.log(differences);

**/
