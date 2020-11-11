export default function ({ store, redirect }) {
  if (store.state.admin.status !== 'success') {
    return redirect('/room')
  }
}
