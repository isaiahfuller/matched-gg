export async function processSteamLibrary(
  setSyncLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setSteamCount: React.Dispatch<React.SetStateAction<number>>,
) {
  setSyncLoading(true);
  const res = await fetch("/steam/processLibrary");
  const library = await res.json();
  console.log(library);
  setSteamCount(library.length);
  setSyncLoading(false);
  return library;
}
