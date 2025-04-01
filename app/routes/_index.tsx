import { Link, type MetaFunction } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "SpliTheBill - Fair Bill Splitting" },
    {
      name: "description",
      content:
        "The polite way to split what you owe when friends cover the bill. Calculate your fair share when friends cover the bill. No awkward math - just quick, fair repayment with tax and tip included.",
    },
    {
      name: "keywords",
      content:
        "split bill, pay friends back, bill calculator, receipt splitting, Venmo payments",
    },
    {
      name: "og:type",
      content: "website",
    },
  ];
};

export default function Index() {
  return (
    <div>
      <div className="text-center">
        <p className="text-xl text-purple-600 mb-6">
          The Polite Way to Split What You Owe
        </p>
        <Link
          to="/app"
          className="bg-purple-700 hover:bg-purple-800 text-white font-medium mb-8 py-3 px-8 rounded-full inline-block transition-all duration-200 hover:shadow-lg"
        >
          Get started
        </Link>
      </div>
      {/* Value Prop */}
      <section className="mb-8">
        <p className="text-lg mb-6">
          <span className="font-bold">
            ✨ Your friend kindly covered dinner?
          </span>
          <br />
          <span className="font-bold">
            🧮 Let's make paying them back <em>effortlessly</em> fair.
          </span>
        </p>
      </section>

      {/* How It Works */}
      <section className="bg-gray-100 rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          How It Works (With Zero Awkwardness):
        </h2>

        {[
          "Enter the total (snap the receipt if you're fancy)",
          "Select your items (or choose an even split)",
          "See your share (tax + tip calculated for you)",
          "Send your payment (via Venmo/PayPal/Cash—you pick)",
        ].map((step, index) => (
          <div key={index} className="flex items-center mb-4">
            <div className="bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              {index + 1}
            </div>
            <p className="text-gray-700">{step}</p>
          </div>
        ))}
      </section>

      {/* Testimonial */}
      <blockquote className="italic text-gray-600 mb-8 border-l-4 border-purple-200 pl-4 py-2">
        "Because good friends pay back—and great friends make it easy."
      </blockquote>

      {/* Benefits */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Why You'll Love This:
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            "✅ Simple & respectful – No public shaming, just gentle clarity",
            "✅ Itemized or even splits – However you want to handle it",
            "✅ Instant payment links – One tap and you're done",
          ].map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
            >
              {benefit}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8">
        <p className="text-xl font-medium mb-6">
          SpliTheBill fairly – and keep the good vibes (and friendships) intact.
        </p>
        <Link
          to="/app"
          className="bg-purple-700 hover:bg-purple-800 text-white font-medium py-3 px-8 rounded-full inline-block transition-all duration-200 hover:shadow-lg"
        >
          Get started
        </Link>
      </section>
    </div>
  );
}
