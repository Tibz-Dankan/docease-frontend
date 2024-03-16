import { teamActions } from "../index";

export const updateTeamMember = (member: any) => {
  return async (dispatch: any) => {
    await dispatch(teamActions.updateTeamMember({ currentMember: member }));
  };
};

export const clearTeam = () => {
  return async (dispatch: any) => {
    dispatch(teamActions.clear());
  };
};
