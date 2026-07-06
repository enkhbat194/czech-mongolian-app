import './a0SrsBridge';
import { allCzechWords } from '../data/allCzechWords';
import { useAppStore } from './useAppStore';

const bridgeKey = Symbol.for('czech-mn-a0-word-bridge-installed');
const bridgeRegistry = globalThis as typeof globalThis & Record<symbol, boolean | undefined>;

if (!bridgeRegistry[bridgeKey]) {
  bridgeRegistry[bridgeKey] = true;
  useAppStore.setState({ words: allCzechWords });
}
