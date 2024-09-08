import useAnimatedUnmount from '../../hooks/useAnimatedUnmount';
import ReactPortal from '../ReactPortal';
import Spinner from '../Spinner';
import { Overlay } from './styles';

interface LoaderInterface {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderInterface) {
  const { animatedElementRef, shouldRender } = useAnimatedUnmount(isLoading);

  if (!shouldRender) {
    return null;
  }

  return (
    <ReactPortal containerId="loader-root">
      <Overlay isLeaving={!isLoading} ref={animatedElementRef}>
        <Spinner size={90} />
      </Overlay>
    </ReactPortal>
  );
}
