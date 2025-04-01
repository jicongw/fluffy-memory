import { useState } from "react";
import { useFetcher } from "@remix-run/react";
import { ActionFunction } from "@remix-run/node";

type Value = {
  yourTotalAmtCalc: string;
  youOweFinalCalc: string;
  youOweFinal: string;
};

const invalidNumber = (num: number): boolean => {
  return isNaN(num) || num === null || num === undefined || num === 0;
};

export default function NumberForm() {
  const [numbers, setNumbers] = useState<number[]>([0]);
  const [vanilla, setVanilla] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const fetcher = useFetcher<Value>();

  // Add new input field
  const addInput = () => {
    setNumbers([...numbers, 0]);
  };

  // Remove an input field
  const removeInput = (index: number) => {
    setNumbers(numbers.filter((_, i) => i !== index));
  };

  // Update input value
  const updateNumber = (index: number, value: string) => {
    const newNumbers = [...numbers];
    newNumbers[index] = parseFloat(value) || 0;
    setNumbers(newNumbers);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation: Ensure all inputs are numbers and not empty
    if (
      numbers.some((num) => invalidNumber(num)) ||
      invalidNumber(vanilla) ||
      invalidNumber(total)
    ) {
      setError("Please enter valid numbers in all fields.");
      return;
    }

    // Clear error if validation passes
    setError(null);
    fetcher.submit(e.currentTarget, { method: "post" });
  };

  return (
    <div className="max-w-md mx-auto mb-12">
      <p className="text-xl mb-4 text-purple-600 text-center">
        Calculate your portion
      </p>

      <fetcher.Form method="post" className="space-y-2" onSubmit={handleSubmit}>
        <div>
          Total <b>after</b> tax + tips, etc
        </div>
        <input
          type="number"
          step="any"
          name="total"
          className="border p-2 w-full"
          onChange={(e) => {
            setError(null);
            setTotal(parseFloat(e.target.value) || 0);
          }}
        />
        <div>
          Total <b>before</b> tax + tips, etc
        </div>
        <input
          type="number"
          step="any"
          name="vanilla"
          className="border p-2 w-full"
          onChange={(e) => {
            setError(null);
            setVanilla(parseFloat(e.target.value) || 0);
          }}
        />
        <div>Your portions</div>
        {numbers.map((num, index) => (
          <div key={index} className="flex gap-2">
            <input
              type="number"
              step="any"
              name="numbers"
              onChange={(e) => updateNumber(index, e.target.value)}
              className="border p-2 w-full"
            />
            {numbers.length > 1 && (
              <button
                type="button"
                onClick={() => removeInput(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="button"
          onClick={addInput}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add another
        </button>
        <br />
        <button
          type="submit"
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Calculate your portion
        </button>
      </fetcher.Form>

      {fetcher.data !== undefined && (
        <>
          <div className="mt-4 text-lg font-bold">
            Your portion: {fetcher.data.youOweFinal}
          </div>
          <div className="mt-4 text-lg font-bold">
            How is the number calculated?
          </div>
          <div className="mt-4 text-lg">
            Your total amount: {fetcher.data.yourTotalAmtCalc}
          </div>
          <div className="mt-4 text-lg">
            You owe: {fetcher.data.youOweFinalCalc}
          </div>
        </>
      )}
    </div>
  );
}

// Remix action function in the same file or in route file
export const action: ActionFunction = async ({ request }): Promise<Value> => {
  const formData = await request.formData();
  const numbers = formData.getAll("numbers") as string[];

  const yourTotalAmt = numbers.map(Number).reduce((acc, num) => acc + num, 0);
  const yourTotalAmtCalc =
    numbers.reduce((acc, num, i) => {
      if (i === 0) {
        return `${acc}${num}`;
      } else {
        return `${acc} + ${num}`;
      }
    }, "") + (numbers.length === 1 ? "" : ` = ${yourTotalAmt}`);

  const total = parseFloat(formData.get("total") as string);
  const vanilla = parseFloat(formData.get("vanilla") as string);

  const youOweFinal = ((yourTotalAmt / vanilla) * total).toFixed(2);
  const youOweFinalCalc = `(${yourTotalAmt} / ${vanilla}) * ${total} = ${youOweFinal}`;

  return { yourTotalAmtCalc, youOweFinalCalc, youOweFinal };
};
