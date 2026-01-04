// Types for layout data
type BlockStatus = 'available' | 'used';
type BlockType = 'chair' | 'table' | 'walkway';
type BlockFace = 'right' | 'left' | 'down' | 'up';

export interface Block {
	id: string;
	type: BlockType;
	status?: BlockStatus;
	face?: BlockFace;
}

export interface AreaLayout {
	area: string;
	blocks: Block[];
}

export interface OutletLayout {
	id: number;
	layout: AreaLayout[];
}

export const outletLayouts: OutletLayout[] = [
	{
		id: 1,
		layout: [
			{
				area: 'Zona AC 1',
				blocks: [
					{
						id: 'A1',
						type: 'chair',
						status: 'available',
						face: 'right',
					},
					{
						id: 'A2',
						type: 'chair',
						status: 'used',
						face: 'right',
					},
					{
						id: 'A3',
						type: 'chair',
						status: 'available',
						face: 'right',
					},
					{
						id: 'A4',
						type: 'chair',
						status: 'available',
						face: 'right',
					},
					{
						id: 'A5',
						type: 'chair',
						status: 'available',
						face: 'right',
					},
					{
						id: 'A6',
						type: 'chair',
						status: 'available',
						face: 'right',
					},
					{
						id: 'A7',
						type: 'walkway',
					},
					{
						id: 'A8',
						type: 'walkway',
					},
					{
						id: 'A10',
						type: 'chair',
						status: 'available',
						face: 'right',
					},
					{
						id: 'A11',
						type: 'chair',
						status: 'available',
						face: 'right',
					},
					{
						id: 'A12',
						type: 'chair',
						status: 'available',
						face: 'right',
					},
					{
						id: 'A13',
						type: 'chair',
						status: 'used',
						face: 'right',
					},
					{
						id: 'A14',
						type: 'chair',
						status: 'available',
						face: 'right',
					},
					{
						id: 'A15',
						type: 'chair',
						status: 'available',
						face: 'right',
					},
					{
						id: 'B7',
						type: 'walkway',
					},
					{
						id: 'B8',
						type: 'walkway',
					},
					{
						id: 'C1',
						type: 'walkway',
					},
					{
						id: 'C2',
						type: 'walkway',
					},
					{
						id: 'C3',
						type: 'walkway',
					},
					{
						id: 'C4',
						type: 'walkway',
					},
					{
						id: 'C5',
						type: 'walkway',
					},
					{
						id: 'C6',
						type: 'walkway',
					},
					{
						id: 'C7',
						type: 'walkway',
					},
					{
						id: 'C8',
						type: 'walkway',
					},
					{
						id: 'C9',
						type: 'walkway',
					},
					{
						id: 'C10',
						type: 'walkway',
					},
					{
						id: 'C11',
						type: 'walkway',
					},
					{
						id: 'C12',
						type: 'walkway',
					},
					{
						id: 'C13',
						type: 'walkway',
					},
					{
						id: 'C14',
						type: 'walkway',
					},
					{
						id: 'C15',
						type: 'walkway',
					},
					{
						id: 'C16',
						type: 'walkway',
					},
					{
						id: 'C17',
						type: 'walkway',
					},
					{
						id: 'D1',
						type: 'walkway',
					},
					{
						id: 'D2',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'D3',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'D4',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'D5',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'D6',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'D7',
						type: 'walkway',
					},
					{
						id: 'D8',
						type: 'walkway',
					},
					{
						id: 'D9',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'D10',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'D11',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'D13',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'D14',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'D15',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'D16',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'E1',
						type: 'walkway',
					},
					{
						id: 'E2',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'E3',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'E4',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'E5',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'E6',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'E7',
						type: 'walkway',
					},
					{
						id: 'E8',
						type: 'walkway',
					},
					{
						id: 'E9',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'E10',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'E11',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'E13',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'E14',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'E15',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'E16',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'F1',
						type: 'walkway',
					},
					{
						id: 'F2',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'F3',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'F4',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'F5',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'F6',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'F7',
						type: 'walkway',
					},
					{
						id: 'F8',
						type: 'walkway',
					},
					{
						id: 'F9',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'F10',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'F11',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'F13',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'F14',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'F15',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'F16',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'G1',
						type: 'walkway',
					},
					{
						id: 'G2',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'G3',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'G4',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'G5',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'G6',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'G7',
						type: 'walkway',
					},
					{
						id: 'G8',
						type: 'walkway',
					},
					{
						id: 'G9',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'G10',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'G11',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'G13',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'G14',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'G15',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'G16',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'H1',
						type: 'walkway',
					},
					{
						id: 'H2',
						type: 'walkway',
					},
					{
						id: 'H3',
						type: 'walkway',
					},
					{
						id: 'H4',
						type: 'walkway',
					},
					{
						id: 'H5',
						type: 'walkway',
					},
					{
						id: 'H6',
						type: 'walkway',
					},
					{
						id: 'H7',
						type: 'walkway',
					},
					{
						id: 'H8',
						type: 'walkway',
					},
					{
						id: 'H9',
						type: 'walkway',
					},
					{
						id: 'H10',
						type: 'walkway',
					},
					{
						id: 'H11',
						type: 'walkway',
					},
					{
						id: 'H12',
						type: 'walkway',
					},
					{
						id: 'H13',
						type: 'walkway',
					},
					{
						id: 'H14',
						type: 'walkway',
					},
					{
						id: 'H15',
						type: 'walkway',
					},
					{
						id: 'H16',
						type: 'walkway',
					},
					{
						id: 'H17',
						type: 'walkway',
					},
					{
						id: 'I1',
						type: 'walkway',
					},
					{
						id: 'I2',
						type: 'walkway',
					},
					{
						id: 'I3',
						type: 'walkway',
					},
					{
						id: 'I4',
						type: 'walkway',
					},
					{
						id: 'I5',
						type: 'walkway',
					},
					{
						id: 'I6',
						type: 'walkway',
					},
					{
						id: 'I7',
						type: 'walkway',
					},
					{
						id: 'I8',
						type: 'walkway',
					},
					{
						id: 'I9',
						type: 'walkway',
					},
					{
						id: 'I10',
						type: 'walkway',
					},
					{
						id: 'I11',
						type: 'walkway',
					},
					{
						id: 'I12',
						type: 'walkway',
					},
					{
						id: 'I13',
						type: 'walkway',
					},
					{
						id: 'I14',
						type: 'walkway',
					},
					{
						id: 'I15',
						type: 'walkway',
					},
					{
						id: 'I16',
						type: 'walkway',
					},
					{
						id: 'I17',
						type: 'walkway',
					},
					{
						id: 'J1',
						type: 'walkway',
					},
					{
						id: 'J2',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'J3',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'J4',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'J5',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'J6',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'J7',
						type: 'walkway',
					},
					{
						id: 'J8',
						type: 'walkway',
					},
					{
						id: 'J9',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'J10',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'J12',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'J13',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'J15',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'J16',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'K1',
						type: 'walkway',
					},
					{
						id: 'K2',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'K3',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'K4',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'K5',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'K6',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'K7',
						type: 'walkway',
					},
					{
						id: 'K8',
						type: 'walkway',
					},
					{
						id: 'K9',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'K10',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'K12',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'K13',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'K15',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'K16',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'L1',
						type: 'walkway',
					},
					{
						id: 'L2',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'L3',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'L4',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'L5',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'L6',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'L7',
						type: 'walkway',
					},
					{
						id: 'L8',
						type: 'walkway',
					},
					{
						id: 'L10',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'L11',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'L12',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'L13',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'L14',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'L15',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'L16',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'M1',
						type: 'walkway',
					},
					{
						id: 'M2',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'M3',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'M5',
						type: 'table',
						status: 'available',
						face: 'down',
					},
					{
						id: 'M4',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'M6',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'M7',
						type: 'walkway',
					},
					{
						id: 'M8',
						type: 'walkway',
					},
					{
						id: 'M10',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'M11',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'M12',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'M13',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'M14',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'M15',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'M16',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'N1',
						type: 'walkway',
					},
					{
						id: 'N2',
						type: 'walkway',
					},
					{
						id: 'N3',
						type: 'walkway',
					},
					{
						id: 'N4',
						type: 'walkway',
					},
					{
						id: 'N5',
						type: 'walkway',
					},
					{
						id: 'N6',
						type: 'walkway',
					},
					{
						id: 'N7',
						type: 'walkway',
					},
					{
						id: 'N8',
						type: 'walkway',
					},
					{
						id: 'N9',
						type: 'walkway',
					},
					{
						id: 'N10',
						type: 'walkway',
					},
					{
						id: 'N11',
						type: 'walkway',
					},
					{
						id: 'N12',
						type: 'walkway',
					},
					{
						id: 'N13',
						type: 'walkway',
					},
					{
						id: 'N14',
						type: 'walkway',
					},
					{
						id: 'N15',
						type: 'walkway',
					},
					{
						id: 'N16',
						type: 'walkway',
					},
					{
						id: 'N17',
						type: 'walkway',
					},
					{
						id: 'O1',
						type: 'walkway',
					},
					{
						id: 'O2',
						type: 'walkway',
					},
					{
						id: 'O3',
						type: 'walkway',
					},
					{
						id: 'O4',
						type: 'walkway',
					},
					{
						id: 'O5',
						type: 'walkway',
					},
					{
						id: 'O6',
						type: 'walkway',
					},
					{
						id: 'O7',
						type: 'walkway',
					},
					{
						id: 'N8',
						type: 'walkway',
					},
					{
						id: 'O9',
						type: 'chair',
						status: 'used',
						face: 'down',
					},
					{
						id: 'O10',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'O11',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'O12',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'O13',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'O14',
						type: 'chair',
						status: 'available',
						face: 'up',
					},
					{
						id: 'O15',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'O16',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'P1',
						type: 'walkway',
					},
					{
						id: 'P2',
						type: 'walkway',
					},
					{
						id: 'P3',
						type: 'walkway',
					},
					{
						id: 'P9',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'P10',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'P11',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'P12',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'P13',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'P14',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
					{
						id: 'P15',
						type: 'chair',
						status: 'available',
						face: 'down',
					},
					{
						id: 'P16',
						type: 'chair',
						status: 'used',
						face: 'up',
					},
				]
			},
			{
				area: 'Zona Semi Outdoor 1',
				blocks: []
			},
			{
				area: 'Zona Semi Outdoor 2',
				blocks: []
			},
			{
				area: 'Zona Outdoor',
				blocks: []
			}
		]
	}
]