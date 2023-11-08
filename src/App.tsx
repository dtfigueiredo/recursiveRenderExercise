import { useState } from 'react';
import { DATA } from './assets/data.ts';
import './assets/global.css';

type tEntry = {
	name: string;
	children?: tEntry[];
};

type tRenderEntry = {
	entry: tEntry;
	detpth: number;
};

function RenderEntry({ entry, detpth }: tRenderEntry) {
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
					{entry.name} {detpth}
				</p>
			</div>

			{isOpen &&
				entry.children?.map((entry, index) => (
					<div style={{ paddingTop: '8px', paddingLeft: `${detpth * 10}px` }}>
						<RenderEntry
							key={`${entry.name}${index}`}
							entry={entry}
							detpth={detpth + 1}
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
			detpth={1}
		/>
	));
}
