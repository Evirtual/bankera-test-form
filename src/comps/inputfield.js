const InputField = (props) => {

  const { rate, name, onClick, amount, setAmount } = props;

  const formater = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: name
  });

  return (
    <label className={`Bankera-label ${name}`}>
      <input
        className={`Bankera-input ${name}`}
        type="number"
        name={name}
        placeholder={formater.format(Number(rate))}
        value={amount || ''}
        onChange={setAmount} />
      <span className={`Bankera-span ${name}`}>{name}</span>
      {name !== "BTC" && <button className={`Bankera-button ${name}`} onClick={onClick}>&#10005;</button>}
    </label>
  )
}

export default InputField