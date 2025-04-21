const YT_ID_REGEX = /^[\w-]{11}$/;

export const extractYouTubeId = (input: string): string | null => {
  const isValidId = (id: string) => YT_ID_REGEX.test(id);

  try {
    const url = new URL(input);

    if (url.hostname === 'youtu.be') {
      const id = url.pathname.slice(1);
      return isValidId(id) ? id : null;
    }

    const id = url.searchParams.get('v');
    return id && isValidId(id) ? id : null;
  } catch {
    return isValidId(input) ? input : null;
  }
};
