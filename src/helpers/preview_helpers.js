export default function (promise) {
  let hasCanceled = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val => (
      hasCanceled ? reject({ pdf: val, isCanceled: true }) : resolve(val)
    ));
    promise.catch(error => (
      hasCanceled ? reject({ isCanceled: true }) : reject(error)
    ));
  });

  return Object.assign(
    wrappedPromise,
    {
      cancel() {
        hasCanceled = true;
      }
    }
  );
}
// {
//   promise: wrappedPromise,
//   cancel() {
//     hasCanceled = true;
//   }
// };
