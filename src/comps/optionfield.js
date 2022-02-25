const OptionField = (props) => {

  const { rate, name } = props;

  const formater = name !== 'Add new currency' && new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: name
  });

  return (
    <option className={`Bankera-option ${name}`} value={name}>{name}{rate && ` - ${formater.format(Number(rate))}`}</option>
  )
}

export default OptionField