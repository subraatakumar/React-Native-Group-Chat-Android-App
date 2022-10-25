import {SingleUserType} from '../settings/types';

const findMessageSentDetails = (members: SingleUserType[], id: string) => {
  if (members && id) {
    let x = members.find((m: any) => m.uid == id);
    return x?.name && 'Sent By: ' + x.name;
  } else {
    return '';
  }
};

export default findMessageSentDetails;
