import Aside from '@/components/Aside/Aside';
import Home from '@/components/Home/Home';
import { ReactElement } from 'react';

function PockemonIdPage() {
  return <Aside />;
}

PockemonIdPage.getLayout = function getLayout(page: ReactElement) {
  return <Home>{page}</Home>;
};

export default Aside;
