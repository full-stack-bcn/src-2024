import RedBox from "@/components/RedBox";
import User from "@/components/User";

export default function Home() {
  return (
    <main>
      <h1>React Components</h1>
      <div>
        {User({ name: "James Bond", age: 27 })}
        <User name="James Bond" age={27} />
        <RedBox>
          This is the interior of the red box
          <div>hola</div>
          <p>adios</p>
        </RedBox>
        <RedBox>
          Another red box
        </RedBox>
      </div>
    </main>
  );
}
