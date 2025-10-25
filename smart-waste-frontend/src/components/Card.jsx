export default function Card({ title, desc, onClick }){
return (
<div className="card" onClick={onClick} role="button">
<h3>{title}</h3>
<p>{desc}</p>
</div>
)
}