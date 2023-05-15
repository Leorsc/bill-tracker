export default function handleTextLimiter(text, numberLimit) {
  const limit = numberLimit ? numberLimit : 50;
  const textoExcedeuLimite = text.length > limit;
  const textoTruncado = text.substring(0, limit) + '...';

  return (
    <>
      {textoExcedeuLimite ? textoTruncado : text}
    </>
  );
}