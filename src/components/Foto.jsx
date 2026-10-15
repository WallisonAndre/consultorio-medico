export function Foto({ src, icone = 'bi-person-circle', tamanho = 48 }) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className="rounded-full object-cover"
        style={{ width: tamanho, height: tamanho, objectFit: 'cover' }}
      />
    )
  }
  return <i className={`bi ${icone} text-gray-500 align-middle`} style={{ fontSize: tamanho, lineHeight: 1 }}></i>
}
