import React from "react";

const Year = (numYears: number) => {
  return (
    <div>
      {numYears} year{numYears > 1 ? "s" : ""}
    </div>
  );
};

function Home1() {
  let a = 1;
  let b = "xxxxx";
  let c = 0.0001;
  let paragraph = (
    <p>
      Lorem {b}, ipsum dolor sit amet consectetur adipisicing elit. Accusamus
      quia deleniti sequi, sunt libero voluptas officia dolores quas deserunt,
      ullam, enim nostrum ea unde eveniet sint. Ex sed saepe deleniti.
    </p>
  );

  const URL = "https://www.upc.edu";
  const elem = "strong";
  const I_want_to_edit = true;

  return (
    <main>
      <article>
        <h1>Hola {a}</h1>
        {paragraph}
        <p>{c}</p>
      </article>
      <a href={URL}>Clica este link</a>
      <span>{URL} sfdads</span>
      <p contentEditable={I_want_to_edit}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla ut,
        adipisci ipsa animi et, eligendi repellendus optio facere, consectetur
        nisi magnam. Dolore in cumque quia, ipsam impedit voluptates odio ullam?
      </p>
      <div className="nice">
        <a href="/">hola</a>
        {Year(1)}
        {Year(5)}
        {"*".repeat(200)}
      </div>
    </main>
  );
}

const TwoItems = (a: number, b: number) => {
  return (
    <>
      <div>{a}</div>
      <div>{b}</div>
    </>
  );
};

export default function Home() {
  return (
    <div>
      <div>
        <h2>Boolean y &quot;Falsy&quot;</h2>
        <div>True: {true}</div>
        <div>False: {false}</div>
        <div>Null: {null}</div>
        <div>Undefined: {undefined}</div>
        <div>Empty string: {""}</div>
      </div>
      <div>
        <h2>Arrays</h2>
        <div>{[1, 2, 3, null, undefined, 4, "", 5]}</div>
        <div>
          {1}
          {2}
          {3}
          {null}
          {undefined}
          {4}
          {""}
          {5}
        </div>
        <div>
          {[1, 2, 3, 1, 1].map((n, index) => (
            <div className="a" key={index} data-x="hola">
              {n}
            </div>
          ))}
        </div>
        <p>
          {TwoItems(5, 14)}
          {TwoItems(13, 4)}
          {TwoItems(100, 200)}
        </p>
        <p>
          {[
            [1, 2],
            [3, 4],
            [5, 6],
          ].map((pair, index) => (
            <React.Fragment key={index}>
              <div>{pair[0]}</div>
              <div>{pair[1]}</div>
            </React.Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}
