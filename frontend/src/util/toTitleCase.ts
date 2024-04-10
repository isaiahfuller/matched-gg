export default function toTitleCase(str:string): string{
  const res = []
  for(const e of str.replace(/-/g," ").split(" ")){
    res.push(e[0].toUpperCase()+e.slice(1).toLowerCase())
  }
  return res.join(" ")
}