import { getData, createData, updateData, deleteData } from "./API.js";

const ENDPOINT = "events";

export const getEvents = async () => {
  try {
    const events = await getData(ENDPOINT);

    return { status: true, data: events };
  } catch (error) {
    return { status: false, message: error };
  }
}

export const newEvent = async (event) => {
  try {
    const { data: events } = await getEvents();
    const eventExists = events.some(dbEvent => event.id === dbEvent.id);

    if (eventExists) {
      throw new Error("An event with this ID already exists");
    }
    await createData(ENDPOINT, event);

    return { status: true, message: "Event created successfully" };
  } catch (error) {
    return { status: false, message: error };
  }
}

export const updateEvent = async (event) => {
  try {
    await updateData(ENDPOINT, event, event.id);
    return { status: true, message: "Event updated successfully" };
  } catch (error) {
    return { status: false, message: error };
  }
}

export const deleteEvent = async (id) => {
  try {
    await deleteData(ENDPOINT, id);
    return { status: true, message: "Event successfully deleted" };
  } catch (error) {
    return { status: false, message: error };
  }
}