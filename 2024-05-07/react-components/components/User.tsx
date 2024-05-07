type UserProps = {
  name: string;
  age: number;
};

/* Componente React: función con nombre en 
     mayúsculas que devuelve JSX i recibe un solo
     parámetro (las props) con unos campos */

export default function User({ name, age }: UserProps) {
  return (
    <div>
      <span className="pr-1">{name}</span>
      <span>{age}</span>
    </div>
  );
}
