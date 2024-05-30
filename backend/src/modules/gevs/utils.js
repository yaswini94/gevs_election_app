export const getCandidatesMapByConstituency = (candidates) => {
  return candidates.reduce((acc, candidate) => {
    const constituency = candidate.constituency_id;

    if (!acc[constituency]) {
      acc[constituency] = [];
    }

    acc[constituency].push({
      name: candidate.name,
      party_id: candidate.party_id,
      party: candidate.party.party_name,
      vote: candidate.vote_count,
    });

    return acc;
  }, {});
};
