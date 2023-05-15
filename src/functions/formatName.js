export default function handleNameFormat(name) {
  return name.split(' ').slice(0, 2).join(' ')
}