import { useUserViews } from 'hooks/api/useUserViews';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';

import globalize from 'lib/globalize';

import type { DisplaySettingsValues } from '../types/displaySettingsValues';
import { CollectionType } from '@jellyfin/sdk/lib/generated-client/models/collection-type';

interface LibraryPreferencesProps {
    onChange: (event: React.SyntheticEvent) => void;
    onChangeCheckboxGroup: (event: React.SyntheticEvent) => void;
    values: DisplaySettingsValues;
}

export function LibraryPreferences({ onChange, onChangeCheckboxGroup, values }: Readonly<LibraryPreferencesProps>) {
    const notAllowedCollections :CollectionType[] = [CollectionType.Folders, CollectionType.Playlists];
    const { data: userViews, isLoading, isError, error } = useUserViews({ asUngrouped: true });
    const items = userViews?.Items?.filter(item => item.CollectionType ? !notAllowedCollections.includes(item.CollectionType) : false);

    return (
        <Stack spacing={3}>
            <Typography variant='h2'>{globalize.translate('HeaderLibraries')}</Typography>

            <FormControl fullWidth>
                <TextField
                    aria-describedby='display-settings-lib-pagesize-description'
                    value={values.libraryPageSize}
                    label={globalize.translate('LabelLibraryPageSize')}
                    name='libraryPageSize'
                    onChange={onChange}
                    slotProps={{
                        htmlInput: {
                            type: 'number',
                            inputMode: 'numeric',
                            max: '1000',
                            min: '0',
                            pattern: '[0-9]',
                            required: true,
                            step: '1'
                        }
                    }}
                />
                <FormHelperText id='display-settings-lib-pagesize-description'>
                    {globalize.translate('LabelLibraryPageSizeHelp')}
                </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
                <FormControlLabel
                    aria-describedby='display-settings-lib-original-title-pref-description'
                    control={
                        <Checkbox
                            checked={values.originalTitlePreference}
                            onChange={onChange}
                        />
                    }
                    label={globalize.translate('OriginalTitlePreferenceLabel')}
                    name='originalTitlePreference'
                />
                <FormHelperText id='display-settings-lib-original-title-pref-description'>
                    {globalize.translate('OriginalTitlePreferenceHelp')}
                </FormHelperText>
            </FormControl>

            <FormControl component='fieldset' variant='standard' fullWidth>
                <FormLabel>{globalize.translate('OriginalTitlePreferenceLibraryIncludesLabel')}</FormLabel>
                {isError && (
                    <FormHelperText error>
                        {error.message}
                    </FormHelperText>
                )}
                {!isLoading && !isError && (
                    <FormGroup>
                        {items?.map((view) => {
                            const isChecked = view.Id ? values?.originalTitlePreferenceLibraryIncludes?.includes(view.Id) : false;

                            return (
                                <FormControlLabel
                                    key={view.Id}
                                    aria-describedby='display-settings-lib-original-title-pref-lang-script-include-description'
                                    control={
                                        <Checkbox
                                            value={view.Id}
                                            checked={isChecked}
                                            onChange={onChangeCheckboxGroup}
                                        />
                                    }
                                    label={view.Name}
                                    name='originalTitlePreferenceLibraryIncludes'
                                />
                            );
                        })}
                    </FormGroup>
                )}
                <FormHelperText id='display-settings-lib-original-title-pref-lang-script-include-description'>
                    {globalize.translate('OriginalTitlePreferenceLibraryIncludesHelp')}
                </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    aria-describedby='display-settings-lib-original-title-pref-lang-script-include-description'
                    value={values.originalTitlePreferenceLanguageScriptIncludes}
                    label={globalize.translate('OriginalTitlePreferenceLanguageScriptIncludesLabel')}
                    name='originalTitlePreferenceLanguageScriptIncludes'
                    onChange={onChange}
                    slotProps={{
                        htmlInput: {
                            type: 'text',
                            inputMode: 'text',
                            maxLength: '255',
                            pattern: '^(?:[a-z]{2}(?:-[A-Z][a-z]{3})?|[A-Z][a-z]{3})(?:,(?:[a-z]{2}(?:-[A-Z][a-z]{3})?|[A-Z][a-z]{3}))*$',
                            required: false
                        }
                    }}
                />
                <FormHelperText id='display-settings-lib-original-title-pref-lang-script-include-description'>
                    {globalize.translate('OriginalTitlePreferenceLanguageScriptIncludesHelp')}
                </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
                <TextField
                    aria-describedby='display-settings-lib-original-title-pref-lang-script-exclude-description'
                    value={values.originalTitlePreferenceLanguageScriptExcludes}
                    label={globalize.translate('OriginalTitlePreferenceLanguageScriptExcludesLabel')}
                    name='originalTitlePreferenceLanguageScriptExcludes'
                    onChange={onChange}
                    slotProps={{
                        htmlInput: {
                            type: 'text',
                            inputMode: 'text',
                            maxLength: '255',
                            pattern: '^(?:[a-z]{2}(?:-[A-Z][a-z]{3})?|[A-Z][a-z]{3})(?:,(?:[a-z]{2}(?:-[A-Z][a-z]{3})?|[A-Z][a-z]{3}))*$',
                            required: false
                        }
                    }}
                />
                <FormHelperText id='display-settings-lib-original-title-pref-lang-script-exclude-description'>
                    {globalize.translate('OriginalTitlePreferenceLanguageScriptExcludesHelp')}
                </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
                <FormControlLabel
                    aria-describedby='display-settings-lib-backdrops-description'
                    control={
                        <Checkbox
                            checked={values.enableLibraryBackdrops}
                            onChange={onChange}
                        />
                    }
                    label={globalize.translate('Backdrops')}
                    name='enableLibraryBackdrops'
                />
                <FormHelperText id='display-settings-lib-backdrops-description'>
                    {globalize.translate('EnableBackdropsHelp')}
                </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
                <FormControlLabel
                    aria-describedby='display-settings-lib-theme-songs-description'
                    control={
                        <Checkbox
                            checked={values.enableLibraryThemeSongs}
                            onChange={onChange}
                        />
                    }
                    label={globalize.translate('ThemeSongs')}
                    name='enableLibraryThemeSongs'
                />
                <FormHelperText id='display-settings-lib-theme-songs-description'>
                    {globalize.translate('EnableThemeSongsHelp')}
                </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
                <FormControlLabel
                    aria-describedby='display-settings-lib-theme-videos-description'
                    control={
                        <Checkbox
                            checked={values.enableLibraryThemeVideos}
                            onChange={onChange}
                        />
                    }
                    label={globalize.translate('ThemeVideos')}
                    name='enableLibraryThemeVideos'
                />
                <FormHelperText id='display-settings-lib-theme-videos-description'>
                    {globalize.translate('EnableThemeVideosHelp')}
                </FormHelperText>
            </FormControl>

            <FormControl fullWidth>
                <FormControlLabel
                    aria-describedby='display-settings-show-missing-episodes-description'
                    control={
                        <Checkbox
                            checked={values.displayMissingEpisodes}
                            onChange={onChange}
                        />
                    }
                    label={globalize.translate('DisplayMissingEpisodesWithinSeasons')}
                    name='displayMissingEpisodes'
                />
                <FormHelperText id='display-settings-show-missing-episodes-description'>
                    {globalize.translate('DisplayMissingEpisodesWithinSeasonsHelp')}
                </FormHelperText>
            </FormControl>
        </Stack>
    );
}
