import compareObj from './compareObj';

test('comparing objects should return true', () => {
  let obj_a = [
    {
      id: 1,
      name: 'Subrat',
    },
    {
      id: 2,
      name: 'Ramesh',
    },
    {
      id: 3,
      name: 'Suresh',
    },
  ];
  let obj_b = [
    {
      id: 1,
      name: 'Subrat',
    },
    {
      id: 3,
      name: 'Suresh',
    },
    {
      id: 2,
      name: 'Ramesh',
    },
  ];
  expect(compareObj(obj_a, obj_b, 'id')).toBeTruthy();
});

test('comparing objects should return true', () => {
  let obj_a = [
    {
      id: 1,
      name: 'Subrat',
    },
    {
      id: 2,
      name: 'Ramesh',
    },
    {
      id: 3,
      name: 'Suresh',
    },
  ];
  let obj_b = [
    {
      id: 1,
      name: 'Subrat',
    },
    {
      id: 4,
      name: 'Suresh',
    },
    {
      id: 2,
      name: 'Ramesh',
    },
  ];
  expect(compareObj(obj_a, obj_b, 'id')).not.toBeTruthy();
});
