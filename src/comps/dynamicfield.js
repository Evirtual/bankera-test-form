const DynamicField = (props) => {

  const { name, onClick, amount, rate } = props;

  const formater = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: name
  });

  return (
    <div className={`Bankera-label ${name}`}>
      <p className={`Bankera-converted ${name} ${isNaN(amount) || amount == 0 ? 'dimmed' : ''}`}>
        {isNaN(amount) || amount == 0  ? formater.format(Number(rate)) : formater.format(Number(amount))}
      </p>
      <span className={`Bankera-span ${name}`}>{name}</span>
      {name !== "BTC" && <button className={`Bankera-button ${name}`} onClick={onClick}>&#10005;</button>}
    </div>
  )
}

export default DynamicField