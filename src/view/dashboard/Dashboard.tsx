import React, {useContext, useEffect, useState} from 'react';
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import SaveIcon from "@mui/icons-material/Save";
import {Box, Breadcrumbs, Button, Skeleton, styled, Tooltip, Typography, useTheme} from '@mui/material';
import useResizeObserver from "use-resize-observer";

import {KPIContentTile} from "@/components/KPIContentTile.tsx";
import {Grid} from "@/components/layouts/Grid.tsx";
import {Tile} from '@/components/layouts/Tile';
import {StatContentTile} from "@/components/StatContentTile.tsx";
import {Fail2BanContext} from '@/context/fail2ban';
import {KPIStats, KPIStatsFormatted} from "@/types/KPIStatsFormatted.ts";


const Root = styled(Box)`
    background-color: ${({theme}) => theme.palette.background.paper};
    padding: ${({theme}) => theme.spacing(3)};
    flex: 1;
`;

const StyledTypography = styled(Typography)`
    transition: color 0.15s;

    &:hover {
        color: ${({theme}) => theme.palette.primary.main};
    }
`;

export const DashboardView: React.FC = () => {
    const theme = useTheme();
    const {bans, jails, globalStats} = useContext(Fail2BanContext);
    const [isEditMode, setIsEditMode] = useState(false);
    const {ref, width} = useResizeObserver();
    const [isLoaded, setIsLoaded] = useState(false);
    const [processedData, setProcessedData] = useState<KPIStats[]>([]);

    const calculatePercentageChange = (current: number, previous: number): number => {
        if (previous === 0) return current * 100; // Avoid division by zero
        return ((current - previous) / previous) * 100;
    };

    const processData = (data: KPIStatsFormatted): KPIStats[] => {
        const keys = Object.keys(data).sort(); // Ensure dates are sorted
        if (keys.length < 1) return []; // Ensure there are at least two days to compare
        const lastDayKey = keys[keys.length - 1];
        const previousDayKey = keys[keys.length - 2];
        const lastDay = data[lastDayKey];
        const previousDay = data[previousDayKey];
        const changes = {
            banned: calculatePercentageChange(lastDay.banned, previousDay.banned),
            currently_banned: calculatePercentageChange(lastDay.currently_banned, previousDay.currently_banned),
            currently_failed: calculatePercentageChange(lastDay.currently_failed, previousDay.currently_failed),
            failed: calculatePercentageChange(lastDay.failed, previousDay.failed)
        };
        return [
            { date: lastDayKey, stats: lastDay, changes }
        ];
    };

    useEffect(() => {
        if (jails.length > 0) {
            console.log(globalStats);
            // type of globalStats
            const processedData = processData(globalStats);
            setProcessedData(processedData);
            console.log(processedData);
            setIsLoaded(true);
        }
    }, [jails]);

    const skeletonParentStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    };


    return (
        <Root ref={ref}>
            <Box
                sx={{
                    display: 'flex',
                    flex: 1,
                    alignItems: 'center',
                    marginBottom: 5,
                    marginTop: 1,
                }}
            >
                <Breadcrumbs aria-label="breadcrumb">
                    <Box sx={{display: 'flex', alignItems: 'center'}}>
                        <DashboardIcon sx={{marginRight: 1}}/>

                        <StyledTypography variant="h5" color="text.primary">
                            Dashboard
                        </StyledTypography>
                    </Box>
                </Breadcrumbs>

                <Box sx={{flex: 1}}/>

                {!isEditMode ? (
                    <Tooltip title="Edit layout" arrow>
                        <Button
                            onClick={() => setIsEditMode(true)}
                            sx={{margin: 0.5}}
                            variant="contained"
                        >
                            <DashboardCustomizeIcon/>
                        </Button>
                    </Tooltip>
                ) : (
                    <Tooltip title="Save layout" arrow>
                        <Button
                            onClick={() => setIsEditMode(false)}
                            sx={{margin: 0.5}}
                            variant="contained"
                            color="secondary"
                        >
                            <SaveIcon/>
                        </Button>
                    </Tooltip>
                )}
            </Box>
            {width && (
                <Grid width={width} type="dashboard" isEditMode={isEditMode}>
                    <Box key="active-jails">
                        <Tile isEditMode={isEditMode} title="Active jails">
                            {!isLoaded ? (
                                <div style={skeletonParentStyle}>
                                    <Skeleton variant="circular" width={50} height={50}/>
                                </div>
                            ) : (
                                <StatContentTile value={jails.length} color={theme.palette.primary.main}/>
                            )}

                        </Tile>
                    </Box>

                    <Box key="active-bans">
                        <Tile isEditMode={isEditMode} title="Active bans">
                            {!isLoaded ? (
                                <div style={skeletonParentStyle}>
                                    <Skeleton variant="circular" width={50} height={50}/>
                                </div>
                            ) : (
                                <StatContentTile value={bans.length} color={theme.palette.primary.main}/>
                            )}
                        </Tile>
                    </Box>

                    <Box key="kpi-bans-day">
                        <Tile isEditMode={isEditMode} title="Ban over the time">
                            {!isLoaded ? (
                                <div style={skeletonParentStyle}>
                                    <Skeleton variant="circular" width={50} height={50}/>
                                </div>
                            ) : processedData.length > 0 && processedData[0].changes ? (
                                <KPIContentTile
                                    percent={processedData[0].changes.banned}
                                    unit={'day'}
                                />
                            ) : (
                                <div>No data available</div>
                            )}
                        </Tile>
                    </Box>


                    <Box key="kpi-match-day">
                        <Tile isEditMode={isEditMode} title="Match over the time">
                            {!isLoaded ? (
                                <div style={skeletonParentStyle}>
                                    <Skeleton variant="circular" width={50} height={50}/>
                                </div>
                            ) : processedData.length > 0 && processedData[0].changes ? (
                                <KPIContentTile
                                    percent={processedData[0].changes?.failed}
                                    unit={'day'}
                                />
                            ) : (
                                <div>No data available</div>
                            )}
                        </Tile>
                    </Box>


                </Grid>
            )}
        </Root>
    )
        ;
};
