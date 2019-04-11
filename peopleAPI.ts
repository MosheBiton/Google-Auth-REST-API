import axios from "axios"; // https://github.com/axios/axios
import { Itoken, Iperson } from "./types";

// https://developers.google.com/people/api/rest/v1/people.connections/list
export async function retriveContacts(accInfo: Itoken) {
  let res = await axios({
    method: "get",
    url: "https://people.googleapis.com/v1/people/me/connections",
    params: {
      // possible personFields options:
      // "addresses,ageRanges,biographies,birthdays,braggingRights,coverPhotos,emailAddresses,events,genders,imClients,interests,locales,memberships,metadata,names,nicknames,occupations,organizations,phoneNumbers,photos,relations,relationshipInterests,relationshipStatuses,residences,sipAddresses,skills,taglines,urls,userDefined"
      personFields: "names",
      pageSize: 2000 // 2000 is the maximum for one page. default is 100.
    },
    headers: {
      Authorization: accInfo.token_type + " " + accInfo.access_token
    }
  });
  return <Iperson[]>res.data.connections;
}

export async function addContact(accInfo: Itoken, person: Iperson) {
  let res = await axios({
    method: "post",
    url: "https://people.googleapis.com/v1/people:createContact",
    data: person,
    headers: {
      Authorization: accInfo.token_type + " " + accInfo.access_token
    }
  });
  return <Iperson>res.data;
}

// https://developers.google.com/people/api/rest/v1/people/deleteContact
// Returns true if the delete was successful, false otherwise
export async function deleteContact(resourceName: string, accInfo: Itoken) {
  const res = await axios({
    method: "delete",
    url: `https://people.googleapis.com/v1/${resourceName}:deleteContact`,
    headers: {
      Authorization: accInfo.token_type + " " + accInfo.access_token,
      Accept: "application/json"
    },
    data: "" // body MUST be empty
  });
  // if the request body is empty, the delete was successful
  if (res.request == "") {
    return true; // delete succeeded
  } else {
    return false; // delete failed
  }
}

// https://developers.google.com/people/api/rest/v1/people/updateContact
export async function updateContact(accInfo: Itoken, resourceName: string, person: Iperson) {
  const PATH_URL = `https://people.googleapis.com/v1/${resourceName}:updateContact`;
  const res = await axios({
    method: "patch",
    url: PATH_URL,
    params: {
      // change according to your needs. What fields do you need to update?
      updatePersonFields: "addresses,biographies,birthdays,emailAddresses,events,genders,imClients,interests,locales,names,nicknames,occupations,organizations,phoneNumbers,relations,residences,sipAddresses,urls,userDefined"
    },
    headers: {
      Authorization: accInfo.token_type + " " + accInfo.access_token,
      Accept: "application/json"
    },
    data: person // body MUST be empty
  });
  if (res) return <Iperson>res.data;
  return null;
}

// if found returns the contact, otherwise returns false
export function findContact(contactList: Iperson[], resourceName: string) {
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].resourceName == resourceName) return contactList[i];
  }
  return null;
}
