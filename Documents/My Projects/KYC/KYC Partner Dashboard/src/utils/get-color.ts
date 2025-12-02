export const getColor = (name: string): string => {
  switch (name?.toLowerCase()) {
    case 'pending':
    case 'created':
    case 'suspended':
    case 'accepted':
    case 'inprogress':
      return '#F5A623';
    case 'verified':
    case 'completed':
    case 'successful':
    case 'active':
    case 'online':
      return '#00AF94';
    case 'failed':
    case 'flagged':
    case 'offline':
      return '#D0021B';
    case 'initiated':
      return '#F5A623';
    case 'deactivated':
      return '#828282';
    default:
      return 'transparent';
  }
};
export const getVerificationAccordionColor = (name: string): string => {
  switch (name?.toLowerCase()) {
    case 'pending':
    case 'created':
      return 'rgba(245, 166, 35, 0.2)';
    case 'verified':
    case 'completed':
      return 'rgba(0, 175, 148, 0.2)';
    case 'failed':
      return '#D0021B';
    case 'initiated':
      return '#F5A623';
    default:
      return 'transparent';
  }
};
