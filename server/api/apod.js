export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const { date, start_date, end_date } = getQuery(event);

  let query = "";
  if (date) {
    query = `&date=${date}`;
  } else if (start_date && end_date) {
    query = `&start_date=${start_date}&end_date=${end_date}`;
  }
  try {
    const data = await $fetch(
      `${config?.public?.baseUrl}planetary/apod?api_key=${config?.apiKey}${query}`
    );
    return data;
  } catch (error) {
    throw createError({
      statusCode: error?.statusCode,
      statusMessage: error?.statusMessage,
    });
  }
});
