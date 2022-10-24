function removeGroupsFromCurrentUser(users, user) {
  return users.filter(y => (y.isGroup ? y.members.includes(user.uid) : y));
}

export default removeGroupsFromCurrentUser;
