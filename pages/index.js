import Layout from '../components/layout';
import moment from 'moment';

export default function Page () {
  const mytime = moment("2019-01-20T19:24:49");
  console.log(mytime);
  const oneWeekAfter = mytime.add(1, 'week');
  console.log(mytime.toISOString());
  console.log(oneWeekAfter.toLocaleString());
  return (
    <Layout>
      <h1>Proof Of A1C</h1>
      <p>
        Publicize blood sugar. Reward healthy blood sugar. 
      </p>
    </Layout>
  )
}