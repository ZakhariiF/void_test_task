import { Box, Title, Text, Image } from '@mantine/core';
import { Info } from '@/app/player/page';
import { FC } from 'react';

type Props = {
  match: Info;
  userId: string;
};

enum TeamType {
  BLUE = 'blue',
  RED = 'red',
}

export const Match: FC<Props> = (props) => {
  const { match, userId } = props;
  const winnerTeam = match.teams.blue.has_won ? 'blue' : 'red';
  const findedPlayer = match.players.all_players.find((player) => player.puuid === userId);

  const gameDurationInSec = match.metadata.game_length / 1000;

  const playerTeam = findedPlayer?.team.toLowerCase() || 'red';
  const isWonPlayerTeam = playerTeam === winnerTeam;

  return (
    <Box
      style={{
        border: '1px solid black',
        borderRadius: '10px',
        marginBottom: '30px',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr', // Create a single row with four columns
        gap: '20px',
      }}
    >
      <Box>
        <Image src={findedPlayer?.assets.agent.small} alt="agent foto" width="400px" />
      </Box>

      <Box>
        <Title order={3}>
          USER INFO
        </Title>
        {findedPlayer && (
          <Box style={{ display: 'flex' }}>
            <Box style={{ flex: 1 }}>
              <Text style={{ marginBottom: "20px" }}>
                Player Name: {findedPlayer.name} <br />
                Agent: {findedPlayer.character} <br />
                Players level: {findedPlayer.level}
              </Text>
              <Title order={5}>CHARACTER STATS</Title>
              <Text>
                Assists: {findedPlayer.stats.assists} <br />
                Bodyshots: {findedPlayer.stats.bodyshots} <br />
                Deaths: {findedPlayer.stats.deaths} <br />
                Headshots: {findedPlayer.stats.headshots} <br />
                Kills: {findedPlayer.stats.kills} <br />
                Legshots: {findedPlayer.stats.legshots} <br />
                Score: {findedPlayer.stats.score}
              </Text>
            </Box>
          </Box>
        )}
      </Box>

      <Box>
        <Title order={3}>
          MATCH INFO
        </Title>
        <Text>
          Match start date: {match.metadata.game_start_patched} <br />
          Match duration: {`${gameDurationInSec}s`} <br />
          Match rounds: {match.rounds.length}
        </Text>
      </Box>

      <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: "space-between", alignItems: "center" }}>
        <Image src={findedPlayer?.assets.card.small} alt="player foto" style={{ height: "300px", width: "300px" }}/>
        <Text style={{ fontSize: "30px", color: `${isWonPlayerTeam ? "green" : "red" }` }}>{isWonPlayerTeam ? 'WIN' : 'LOSS'}</Text>
      </Box>
    </Box>
  );
};
