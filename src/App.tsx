import { useState } from 'react';
import { DATA } from './assets/data.ts';
import './assets/global.css';

type tEntry = {
	name: string;
	children?: tEntry[];
};

type tRenderEntry = {
	entry: tEntry;
	depth: number;
};

function RenderEntry({ entry, depth }: tRenderEntry) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div>
			<div className='label'>
				{entry.children && (
					<button onClick={() => setIsOpen(!isOpen)}>
						{entry.children && !isOpen ? '+' : '-'}
					</button>
				)}

				<p>
					{entry.name} {depth}
				</p>
			</div>

			{isOpen &&
				entry.children?.map((entry, index) => (
					<div style={{ paddingTop: '8px', paddingLeft: `${depth * 10}px` }}>
						<RenderEntry
							key={`${entry.name}${index}`}
							entry={entry}
							depth={depth + 1}
						/>
					</div>
				))}
		</div>
	);
}

export function App() {
	if (!DATA) {
		throw new Error('No data');
	}

	return DATA.children.map((entry, index) => (
		<RenderEntry
			key={`${entry.name}${index}`}
			entry={entry}
			depth={1}
		/>
	));
}
